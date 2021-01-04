import AbstractModel from 'app/schema/models/abstractModel';
import { BackendSector } from 'app/consts/interfaces/sector';
import { Action, CombinedState, Dispatch } from 'redux';
import { AppStore } from 'app/reducers';

interface Row {
    sector_id: number;
    sector_uid: string;
    name: string | null;
}

export default class ModelSector extends AbstractModel<BackendSector.Definition, Row> {

    private readonly name: string | null;
    private readonly sectorId: number;
    private readonly sectorUId: string;

    private locked: boolean = false;
    private occupied: boolean = false;

    constructor(row: Row) {
        super();
        this.name = row.name;
        this.sectorId = row.sector_id;
        this.sectorUId = row.sector_uid;
    }

    public setOccupied(state: boolean): void {
        this.occupied = state;
    }

    public setLocked(state: boolean): void {
        this.locked = state;
    }

    public getOccupied(): boolean {
        return this.occupied;
    }

    public getLocked(): boolean {
        return this.locked;
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

    protected mapDispatch(dispatch: Dispatch<Action<string>>): any {
    }

    protected mapState(state: CombinedState<AppStore>): any {
    }
}
