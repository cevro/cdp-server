import { ENTITY_TURNOUT } from 'app/consts/entity';
import AbstractModel from 'app/schema/models/abstractModel';
import { BackendTurnout } from 'app/consts/interfaces';

export default class ModelTurnout extends AbstractModel<BackendTurnout.Snapshot> {

    public readonly name: string;
    public readonly turnoutUId: string;
    public readonly turnoutId: number;
    public readonly basePosition: BackendTurnout.EndPosition;

    public currentPosition: BackendTurnout.Position = 'U';
    public requestedPosition: BackendTurnout.EndPosition | null = null;

    private lockedBy: number[] = [];

    constructor(row: BackendTurnout.Row) {
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
    public toArray(): BackendTurnout.Snapshot {
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

    public requestChange(position: BackendTurnout.EndPosition) {
        this.requestedPosition = position;
        this.emit('change');
        setTimeout(() => {
            this.confirmChange(position);
        }, 4000);
        /* locoNetConnector.send({
             locoNetId: 1,// this.locoNetId,
             type: 's',
             value: position,
         });*/
    }

    private confirmChange(value: BackendTurnout.EndPosition) {
        if (value === this.currentPosition) {
            return;
        }
        this.currentPosition = value;
        this.emit('change');
    }
}
