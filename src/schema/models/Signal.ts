import { Message } from '@definitions/messages';
import { LocoNetMessage } from 'app/schema/services/DateReceiver';
import { locoNetConnector } from 'app/inc/SerialConnector/SerialConnector';

interface QueryRow {
    signal_id: number;
    loconet_id: number;
    name: string;
}

export default class Signal /*extends LocoNetObject<SignalState>*/ {

    private _displayAspect: number;
    private _requestedAspect: number;

    public readonly signalId: number;
    public readonly name: string;

    public constructor(row: QueryRow) {
        this.signalId = row.signal_id;
        this.name = row.name;
        this._displayAspect = -1;
        this._requestedAspect = -1;
    }

    public getDisplayAspect() {
        return this._displayAspect;
    }

    public getRequestedAspect() {
        return this._requestedAspect;
    }

    public handleLocoNetReceive(data: LocoNetMessage): void {
        switch (data.type) {
            case 'a':
                console.log('a');
                return this.confirmChange(data.value);
            case 'r':
                return console.log('r');
        }
        return;
    }

    public requestChange(aspect: number): void {
        if (aspect === this._requestedAspect) {
            return;
        }
        this._requestedAspect = aspect;
        locoNetConnector.send({
            locoNetId: 1,// this.locoNetId,
            type: 'a',
            value: aspect,
        });
        //   this.sendState();
    }

    public handlePatch(message: Message): void {
        this.requestChange(message.data.state);
    }

    private confirmChange(value: number) {
        if (value === this._displayAspect) {
            return;
        }
        this._displayAspect = value;
        //     this.sendState();
    }
}
