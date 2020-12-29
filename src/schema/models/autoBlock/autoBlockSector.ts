import { locoNetConnector } from 'app/serialConnector/';
import { Message } from '@definitions/messages';
import { ABSectorState } from 'app/consts/interfaces';
import { LocoNetMessage } from 'app/schema/services/DateReceiver';

export default class AutoBlockSector /*extends LocoNetObject<ABSectorState> */ {
    private _error: number;
    private _state: number;
    private active: number;
    private blockCondition: number;

    set state(value: number) {
        if (value === this._state) {
            return;
        }
        this._state = value;
        // this.sendState();
    }

    get state() {
        return this._state;
    }

    set errorCode(value: number) {
        if (value === this._error) {
            return;
        }
        this._error = value;
        // this.sendState();
    }

    get errorCode(): number {
        return this._error;
    }

    get errorMessage(): string {
        switch (this._error) {
            case 0:
                return '';
            case 1:
                return 'Full block condition';
        }
        return 'undefined';
    }

    constructor(data: any) {
        //  super(data.locoNetId, ENTITY_AB_SECTOR);
        this._state = -1;
        this._error = -1;
        this.active = -1;
        this.blockCondition = -1;
    }

    public toObject(): ABSectorState {
        return {
            state: this.state,
            locoNetId: 1,// this.locoNetId,
            errorCode: this.errorCode,
            errorMessage: this.errorMessage,
            blockCondition: this.blockCondition,
            active: this.active,
        };
    }

    public handleLocoNetReceive(data: LocoNetMessage): void {
        switch (data.type) {
            case 'e':
                this.errorCode = data.value;
                break;
            case 's':
                this.state = data.value;
                break;
            case 'a':
                this.active = data.value;
                //  this.sendState();
                break;
            case 'c':
                this.blockCondition = data.value;
                //  this.sendState();
                break;
        }
        // console.log(this);
    }

    public handlePatch(message: Message): void {
        if (message.data.hasOwnProperty('blockCondition')) {
            locoNetConnector.send({
                locoNetId: 1,// this.locoNetId,
                type: 'c',
                value: message.data.blockCondition,
            });
        }
        if (message.data.hasOwnProperty('error')) {
            locoNetConnector.send({
                locoNetId: 1,// this.locoNetId,
                type: 'e',
                value: message.data.error,
            });
        }
        //    super.handlePatch(message);
    }
}
