import { SectorState } from '@definitions/interfaces';
import { SectorBackEndDefinition } from 'app/data/sectors';
import { Message } from '@definitions/messages';
import { LocoNetMessage } from 'app/schema/services/DateReceiver';
import { locoNetConnector } from 'app/inc/SerialConnector/SerialConnector';

export const STATUS_BUSY = 2;
export const STATUS_FREE = 1;
export const STATUS_UNDEFINED = -1;

export default class Sector /*extends LocoNetObject<SectorState>*/ {
    private _locked: number;
    private _state: number;

    constructor(definition: SectorBackEndDefinition) {
        //super(definition.locoNetId, ENTITY_SECTOR);
        this._locked = null;
        this._state = STATUS_UNDEFINED;

    }

    set state(value: number) {
        if (this._state === value) {
            return;
        }
        this._state = value;
        //this.sendState();
    }

    get state(): number {
        return this._state;
    }

    set locked(value: number) {
        this._locked = value;
        //this.sendState();
    }

    get locked(): number {
        return this._locked;
    }

    public lock(id: number) {
        this.locked = id;
        // this.sendState();
    }

    public unlock(id: number) {
        if (this.locked === id) {
            this.locked = null;
        }
    }

    public check(): void {
        if (this.locked) {
            throw Error('Locked by ' + this.locked);
        }
        if (this.state !== STATUS_FREE) {
            throw Error('Not free');
        }
    }

    /**
     * return true if sector is in VC
     */
    public isFreeAndAllocated(id: number): boolean {
        return (this.state === STATUS_FREE) && (this.locked === id);
    }

    public toObject(): SectorState {
        return {
            state: this.state,
            locoNetId: 1,//this.locoNetId,
            locked: this.locked,
        };
    }

    public handleLocoNetReceive(data: LocoNetMessage) {
        switch (data.type) {
            case 's':
                this.state = data.value;
        }
    }

    public handlePatch(message: Message) {
        locoNetConnector.send({
            locoNetId: 1,// this.locoNetId,
            type: 's',
            value: message.data.state,
        });
    }
}




