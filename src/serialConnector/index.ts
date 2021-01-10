import * as SerialPort from 'serialport';
import { SerialMapping } from 'app/serialConnector/mapping';
import { EventsConnector } from 'app/glogalEvents/eventCollector';
import { Actions } from 'app/actions';

export interface SerialMessage {
    uId: string | null;
    type: string;
    value: number;
}

export default class SerialConnector extends EventsConnector {
    private connector: SerialPort;

    private port: string = '/dev/ttyUSB0';

    public constructor() {
        super();
        this.tryConnect();
        this.registerListener();
    }

    public tryConnect(): void {

        try {
            this.connector = new SerialPort(this.port, {
                baudRate: 115200,
                // defaults for Arduino serial communication
                dataBits: 8,
                parity: 'none',
                stopBits: 1,
            }, (err) => {
                console.log(err);
            });
            this.dateReceive();
        } catch (e) {
            console.log(e);
        }
    }

    public send(data: SerialMessage): void {
        const msg = SerialMapping.getSerialId(data.uId) + ':' + data.type + ':' + data.value + '\r\n';
        console.log('send:' + msg);
        this.connector.write(msg);
    }

    private registerListener() {
        this.getContainer().on(Actions.Serial.MESSAGE_SEND, (message: SerialMessage) => {
            this.send(message);
        });
    }

    private dateReceive(): void {
        const parser = new SerialPort.parsers.Readline({
            delimiter: '\r\n',
            encoding: 'ascii',
        });
        this.connector.pipe(parser);

        parser.on('data', (data) => {
            this.handleReceive(data.toString());
        });
    }

    private handleReceive(msg: string): void {
        if (!msg.match(/[0-9]+:[a-z]:-?[0-9]+/)) {
            console.log('errored received:' + msg);
            return null;
        }
        const [serialId, type, value] = msg.split(':');
        const message: SerialMessage = {
            uId: SerialMapping.getUId(+serialId),
            type,
            value: +value,
        };

        this.getContainer().emit(Actions.Serial.MESSAGE_RECEIVE, message);
        return;
    }
}
