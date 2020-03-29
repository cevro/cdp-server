import {
    TurnoutDefinition,
    TurnoutPosition,
    RequestedTurnoutPosition,
} from '@definitions/points';
import {PointLockedError} from '../../Exceptions/Errors';
import {
    LocoNetMessage,
} from '../../Factories/DateReceiver';
import {TurnoutMessages} from '@definitions/messages/turnout';
import {locoNetConnector} from '../../SerialConnector/SerialConnector';
import LocoNetObject from '../LocoNetObject';
import {Message} from "@definitions/messages";

export default class Turnout extends LocoNetObject<TurnoutMessages.RequestsType, TurnoutMessages.StateUpdateData> {
    public readonly sector: number;
    private _position: TurnoutPosition;
    private _requestedPosition: RequestedTurnoutPosition;

    private lockedBy: number[] = [];

    constructor(definition: TurnoutDefinition) {
        super(definition.locoNetId, 'turnout');

        this._position = 0;
        this.sector = definition.sector;
        this._requestedPosition = null;
    }

    set position(value: TurnoutPosition) {
        this._position = value;
        this.sendState();
    }

    get position() {
        return this._position;
    }

    set requestedPosition(value: RequestedTurnoutPosition) {
        this._requestedPosition = value;
        this.sendState();
    }

    get requestedPosition(): RequestedTurnoutPosition {
        return this._requestedPosition;
    }

    public check(position: RequestedTurnoutPosition): void {
        if (this.position === position) {
            return;
        }
        if (this.lockedBy.length) {
            throw new PointLockedError(this, position);
        }
    }

    public async lock(trainLockId: number, position: RequestedTurnoutPosition) {
        if (this.position !== position) {
            await this.changePosition(position);
        }
        this.lockedBy.push(trainLockId);
        this.sendState();
    }

    public unlock(id: number) {
        this.lockedBy = this.lockedBy.filter((lockerId) => {
            return lockerId !== id;
        });
        this.sendState();
    }

    public toObject(): TurnoutMessages.StateUpdateData {
        return {
            locoNetId: this.locoNetId,
            position: this.position,
            requestedPosition: this.requestedPosition,
            locked: this.lockedBy,
        };
    }

    public handleLocoNetReceive(message: LocoNetMessage): void {
    }

    handlePatch(message: Message): void {
        if(message.data.hasOwnProperty('requestedPosition')){
            this.handleChangePositionRequest(message.data.requestedPosition);
        }
        super.handlePatch(message);
    }

    private changePosition(position: RequestedTurnoutPosition) {
        this.requestedPosition = position;
        locoNetConnector.send({
            locoNetId: this.locoNetId,
            type: 's',
            value: position,
        });
    }

    private handleChangePositionRequest(requestedPosition: RequestedTurnoutPosition): void {
        this.changePosition(requestedPosition);
    }

}
