import ModelSector from '../models/modelSector';
import AbstractService from 'app/schema/services/abstractService';
import { Action, CombinedState, Dispatch } from 'redux';
import { AppStore } from 'app/reducers';
import { createActionWithModel, SECTOR_ACTIONS_PREFIX } from 'app/actions/models';

export default class SectorService extends AbstractService<ModelSector, {}, {}> {

    protected mapDispatch(dispatch: Dispatch<Action<string>>) {
        return {
            init: (modelSector: ModelSector) =>
                dispatch(createActionWithModel(SECTOR_ACTIONS_PREFIX, 'ACTION_INIT')(modelSector)),
            update: (modelSector: ModelSector) =>
                dispatch(createActionWithModel(SECTOR_ACTIONS_PREFIX, 'ACTION_UPDATE')(modelSector)),
        };
    }

    protected mapState(state: CombinedState<AppStore>) {
        return {
            models: state.sectors,
        };
    }

    protected getModelClass(): { new(row: any): ModelSector } {
        return ModelSector;
    }

    protected getTableName(): string {
        return 'sector';
    }
}
