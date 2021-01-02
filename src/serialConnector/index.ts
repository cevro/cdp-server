import * as SerialPort from 'serialport';
import { PortInfo } from 'serialport';

export interface LocoNetMessage {
    locoNetId: number;
    type: string;
    value: number;
}

export interface LocoNetReceiver {
    handleLocoNetReceive(message: LocoNetMessage): void;
}


class SerialConnector /*implements HttpReceiver<Message>*/ {
    private listeners: LocoNetReceiver[] = [];

    private connector: SerialPort;
    private params: SerialPort.OpenOptions;
    private ports: PortInfo[] = [];

    private port: string = '/dev/ttyUSB1';

    public tryConnect() {

        try {
            this.connector = new SerialPort(this.port, {
                baudRate: 115200,
                // defaults for Arduino serial communication
                dataBits: 8,
                parity: 'none',
                stopBits: 1,
            }, (err) => {
                // console.log(err);
            });
            this.dateReceive();
        } catch (e) {
            console.log(e);
        }
    }

    public registerListener(listener: LocoNetReceiver) {
        this.listeners.push(listener);
    }

    public send(data: LocoNetMessage): void {
        const msg = data.locoNetId + ':' + data.type + ':' + data.value + '\r\n';
        // console.log('send:' + msg);
        this.connector.write(msg);
    }

    private dateReceive(): void {
        const parser = new SerialPort.parsers.Readline({
            delimiter: '\r\n',
            encoding: 'ascii',
        });
        this.connector.pipe(parser);

        parser.on('data', (data) => {
            const msg = this.parseMessage(data.toString());
            if (!msg) {
                return;
            }
            this.listeners.forEach((listener) => {
                listener.handleLocoNetReceive(msg);
            });
            // console.log('parsed received:' + data);
        });
    }

    private parseMessage(msg: string): LocoNetMessage {
        if (!msg.match(/[0-9]+:[a-z]:-?[0-9]+/)) {
            console.log('errored received:' + msg);
            return null;
        }
        const [loconetId, type, value] = msg.split(':');
        return {
            locoNetId: +loconetId,
            type,
            value: +value,
        };
    }
}

export const locoNetConnector = new SerialConnector();

