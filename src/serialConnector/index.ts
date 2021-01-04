import * as SerialPort from 'serialport';
import ReduxConnector from 'app/reduxConnector';
import { Action, CombinedState, Dispatch } from 'redux';
import { AppStore } from 'app/reducers';
import { SerialMapping } from 'app/serialConnector/mapping';
import { addReceived, sendSuccess } from 'app/actions/serial';
import { MapObjects } from 'app/consts/messages';

export interface SerialMessage {
    uId: string | null;
    type: string;
    value: number;
}

export default class SerialConnector extends ReduxConnector<{
    toSent: MapObjects<SerialMessage>;
}, {
    onMessageReceive(message: SerialMessage): void;
    onMessageSent(messageId: string): void;
}> {
    private connector: SerialPort;

    private port: string = '/dev/ttyUSB0';

    constructor() {
        super();
        this.tryConnect();
        this.connect();
    }

    protected reduxPropsDidUpdated(oldProps) {
        super.reduxPropsDidUpdated(oldProps);
        for (const messageId in this.reduxProps.state.toSent) {
            if (this.reduxProps.state.toSent.hasOwnProperty(messageId)) {
                this.send(this.reduxProps.state.toSent[messageId], messageId);
            }
        }
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

    public send(data: SerialMessage, messageId: string): void {
        const msg = SerialMapping.getSerialId(data.uId) + ':' + data.type + ':' + data.value + '\r\n';
        console.log('send:' + msg);
        this.connector.write(msg);
        this.reduxProps.dispatch.onMessageSent(messageId);
    }

    protected mapDispatch(dispatch: Dispatch<Action<string>>) {
        return {
            onMessageReceive: (message: SerialMessage) => dispatch(addReceived(message)),
            onMessageSent: (messageId: string) => dispatch(sendSuccess(messageId)),
        };
    }

    protected mapState(state: CombinedState<AppStore>) {
        return {
            toSent: state.serialConnector.toSent,
        };
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
            this.reduxProps.dispatch.onMessageReceive(msg);
        });
    }

    private parseMessage(msg: string): SerialMessage {
        if (!msg.match(/[0-9]+:[a-z]:-?[0-9]+/)) {
            console.log('errored received:' + msg);
            return null;
        }
        const [serialId, type, value] = msg.split(':');
        return {
            uId: SerialMapping.getUId(+serialId),
            type,
            value: +value,
        };
    }
}
