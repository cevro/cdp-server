import AbstractModel from 'app/schema/models/abstractModel';
import { ENTITY_SECTOR } from 'app/consts/entity';
import { BackendSector } from 'app/consts/interfaces/sector';
import { Action, CombinedState, Dispatch } from 'redux';
import { AppStore } from 'app/reducers';

export default class ModelSector extends AbstractModel<BackendSector.Definition, { state: BackendSector.States }> {

    private readonly name: string | null;
    private readonly sectorId: number;
    private readonly sectorUId: string;

    constructor(row: BackendSector.Row) {
        super(ENTITY_SECTOR);

        this.name = row.name;
        this.sectorId = row.sector_id;
        this.sectorUId = row.sector_uid;

    }

    public setState(state: BackendSector.States) {
        // this.reduxProps.state.state = state;
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

    protected mapDispatch(dispatch: Dispatch<Action<string>>): any {
    }

    protected mapState(state: CombinedState<AppStore>): any {
    }
}
