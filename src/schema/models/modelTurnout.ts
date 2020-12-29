import { ENTITY_TURNOUT } from 'app/consts/entity';
import AbstractModel from 'app/schema/models/abstractModel';

interface QueryRow {
    turnout_id: number;
    turnout_uid: string;
    name: string;
    base_position: Turnout.EndPosition;
}

export default class ModelTurnout extends AbstractModel<Turnout.State> implements Turnout.State {

    public readonly name: string;
    public readonly turnoutUId: string;
    public readonly turnoutId: number;
    public readonly basePosition: Turnout.EndPosition;

    public currentPosition: Turnout.Position = 'U';
    public requestedPosition: Turnout.EndPosition | null = null;

    private lockedBy: number[] = [];

    constructor(row: QueryRow) {
        super(ENTITY_TURNOUT);
        this.name = row.name;
        this.turnoutId = row.turnout_id;
        this.turnoutUId = row.turnout_uid;
        this.basePosition = row.base_position;
    }

    /*
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
    */
    public toArray(): Turnout.State {
        return {
            name: this.name,
            turnoutId: this.turnoutId,
            turnoutUId: this.turnoutUId,
            currentPosition: this.currentPosition,
            requestedPosition: this.requestedPosition,
            basePosition: this.basePosition,
        };
    }

    public getPrimary(): number {
        return this.turnoutId;
    }

    public getUId(): string {
        return this.turnoutUId;
    }

    public changePosition(position: Turnout.EndPosition) {
        this.requestedPosition = position;
        this.emit('change');
        setTimeout(() => {
            this.confirmChange(position);
        })
        /* locoNetConnector.send({
             locoNetId: 1,// this.locoNetId,
             type: 's',
             value: position,
         });*/
    }

    private confirmChange(value: Turnout.EndPosition) {
        if (value === this.currentPosition) {
            return;
        }
        this.currentPosition = value;
        this.emit('change');
    }
}


export namespace Turnout {
    export interface State {
        name: string;
        turnoutUId: string;
        turnoutId: number;
        basePosition: EndPosition;
        currentPosition: Turnout.Position;
        requestedPosition: Turnout.EndPosition | null;
    }

    export type EndPosition = 'D' | 'S';
    export type Position = EndPosition | 'U';
}
