import { ENTITY_TURNOUT } from 'app/consts/entity';
import AbstractModel from 'app/schema/models/abstractModel';
import { BackendTurnout } from 'app/consts/interfaces/turnout';

export default class ModelTurnout extends AbstractModel<BackendTurnout.Definition> {

    private readonly name: string;
    private readonly turnoutUId: string;
    private readonly turnoutId: number;
    private readonly basePosition: BackendTurnout.EndPosition;

    private currentPosition: BackendTurnout.Position = 'U';
    private requestedPosition: BackendTurnout.EndPosition | null = null;

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
    public toArray(): BackendTurnout.Definition {
        return {
            name: this.name,
            turnoutId: this.turnoutId,
            turnoutUId: this.turnoutUId,
            // currentPosition: this.currentPosition,
            // requestedPosition: this.requestedPosition,
            basePosition: this.basePosition,
        };
    }

    public getUId(): string {
        return this.turnoutUId;
    }


    public requestChange(position: BackendTurnout.EndPosition): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.requestedPosition = position;
            setTimeout(() => {
                this.confirmChange(position);
                resolve();
            }, 1000);
            /* locoNetConnector.send({
                 locoNetId: 1,// this.locoNetId,
                 type: 's',
                 value: position,
             });*/
        });

    }

    private confirmChange(value: BackendTurnout.EndPosition) {
        if (value === this.currentPosition) {
            return;
        }
        this.currentPosition = value;
    }
}
