import {LocoNetMessage} from '../Factories/DateReceiver';
import {locoNetConnector} from '../SerialConnector/SerialConnector';
import {ENTITY_SIGNAL} from '@definitions/entity';
import {Message} from '@definitions/messages';
import LocoNetObject from './LocoNetObject';
import {LocoNetDefinition} from '@definitions/interfaces';
import {SignalState} from "@app/consts/signals/interfaces";

export default class Signal extends LocoNetObject<SignalState> {

    private _displayAspect: number;
    private _requestedAspect: number;

    public constructor(definition: LocoNetDefinition) {
        super(definition.locoNetId, ENTITY_SIGNAL);
        this._displayAspect = -1;
        this._requestedAspect = -1;
    }

    public getDisplayAspect() {
        return this._displayAspect;
    }

    public getRequestedAspect() {
        return this._requestedAspect;
    }

    public toObject(): SignalState {
        return {
            displayAspect: this._displayAspect,
            requestedAspect: this._requestedAspect,
            locoNetId: this.locoNetId,
        };
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
            locoNetId: this.locoNetId,
            type: 'a',
            value: aspect,
        });
        this.sendState();
    }

    public handlePatch(message: Message): void {
        this.requestChange(message.data.state);
    }

    private confirmChange(value: number) {
        if (value === this._displayAspect) {
            return;
        }
        this._displayAspect = value;
        this.sendState();
    }
}
