import AbstractModel from 'app/schema/models/abstractModel';
import { BackendSector } from 'app/consts/interfaces/sector';
import { Actions } from 'app/actions';

interface Row {
    sector_id: number;
    sector_uid: string;
    name: string | null;
}

export default class ModelSector extends AbstractModel<BackendSector.Definition, Row> {

    private readonly name: string | null;
    private readonly sectorId: number;
    private readonly sectorUId: string;

    private _locked: boolean = false;
    private _occupied: boolean = false;

    public constructor(row: Row) {
        super();
        this.name = row.name;
        this.sectorId = row.sector_id;
        this.sectorUId = row.sector_uid;
        this.getContainer().emit(Actions.Sector.MODEL_CREATED, this);
    }

    public set occupied(state: boolean) {
        this._occupied = state;
        this.getContainer().emit(Actions.Sector.OCCUPIED_CHANGED, this);
    }

    public set locked(state: boolean) {
        this._locked = state;
        this.getContainer().emit(Actions.Sector.LOCKED_CHANGED, this);
    }

    public get occupied(): boolean {
        return this._occupied;
    }

    public get locked(): boolean {
        return this._locked;
    }

    public getUId(): string {
        return this.sectorUId;
    }

    public toArray() {
        return {
            name: this.name,
            sectorId: this.sectorId,
            sectorUId: this.sectorUId,
            locked: this.locked,
            occupied: this.occupied,
        };
    }
}
