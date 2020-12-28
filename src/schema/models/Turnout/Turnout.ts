import { Message } from '@definitions/messages';
import { RequestedTurnoutPosition, TurnoutDefinition, TurnoutPosition } from 'app/consts/turnouts';
import { TurnoutState } from 'app/consts/interfaces';
import { PointLockedError } from 'app/inc/Exceptions/Errors';
import { locoNetConnector } from 'app/inc/SerialConnector/SerialConnector';
import { LocoNetMessage } from 'app/schema/services/DateReceiver';

export default class Turnout /* extends LocoNetObject<TurnoutState> */ {
    public readonly sector: number;
    private _position: TurnoutPosition;
    private _requestedPosition: RequestedTurnoutPosition;

    private lockedBy: number[] = [];

    constructor(definition: TurnoutDefinition) {
        //super(definition.locoNetId, 'turnout');

        this._position = 0;
        this.sector = definition.sector;
        this._requestedPosition = null;
    }

    set position(value: TurnoutPosition) {
        this._position = value;
        // this.sendState();
    }

    get position() {
        return this._position;
    }

    set requestedPosition(value: RequestedTurnoutPosition) {
        this._requestedPosition = value;
        //  this.sendState();
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
        //   this.sendState();
    }

    public unlock(id: number) {
        this.lockedBy = this.lockedBy.filter((lockerId) => {
            return lockerId !== id;
        });
        //    this.sendState();
    }

    public toObject(): TurnoutState {
        return {
            locoNetId: 1,// this.locoNetId,
            position: this.position,
            requestedPosition: this.requestedPosition,
            locked: this.lockedBy,
        };
    }

    public handleLocoNetReceive(message: LocoNetMessage): void {
    }

    handlePatch(message: Message): void {
        if (message.data.hasOwnProperty('requestedPosition')) {
            this.handleChangePositionRequest(message.data.requestedPosition);
        }
        //super.handlePatch(message);
    }

    private changePosition(position: RequestedTurnoutPosition) {
        this.requestedPosition = position;
        locoNetConnector.send({
            locoNetId: 1,// this.locoNetId,
            type: 's',
            value: position,
        });
    }

    private handleChangePositionRequest(requestedPosition: RequestedTurnoutPosition): void {
        this.changePosition(requestedPosition);
    }

}
