import AbstractModel from 'app/schema/models/abstractModel';
import { ENTITY_SECTOR } from 'app/consts/entity';
import { BackendSector } from 'app/consts/interfaces/sector';

export default class ModelSector extends AbstractModel<BackendSector.Definition> {

    public state: BackendSector.States;

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

    public setState(state: BackendSector.States) {
        this.state = state;
    }

    public getUId(): string {
        return this.sectorUId;
    }

    public toArray(): BackendSector.Definition {
        return {
            name: this.name,
            sectorId: this.sectorId,
            sectorUId: this.sectorUId,
            // state: this.state,
        };
    }
}
