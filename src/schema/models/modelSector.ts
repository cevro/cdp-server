import AbstractModel from 'app/schema/models/abstractModel';
import { ENTITY_SECTOR } from 'app/consts/entity';
import { BackendSector } from 'app/consts/interfaces';

export default class ModelSector extends AbstractModel<BackendSector.Snapshot> {

    private state: BackendSector.State;

    private readonly name: string | null;
    private readonly sectorId: number;
    private readonly sectorUId: string;

    constructor(row: BackendSector.Row) {
        super(ENTITY_SECTOR);

        this.name = row.name;
        this.sectorId = row.sector_id;
        this.sectorUId = row.sector_uid;
        this.state = 'free';
    }

    public setState(state: BackendSector.State) {
        this.state = state;
        this.emit('change');
    }

    public getPrimary(): number {
        return this.sectorId;
    }

    public getUId(): string {
        return this.sectorUId;
    }

    public toArray(): BackendSector.Snapshot {
        return {
            name: this.name,
            sectorId: this.sectorId,
            sectorUId: this.sectorUId,
            state: this.state,
        }
    }
}
