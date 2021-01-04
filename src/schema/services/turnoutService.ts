import ModelTurnout from '../models/modelTurnout';
import AbstractService from 'app/schema/services/abstractService';
import { Action, CombinedState, Dispatch } from 'redux';
import { AppStore } from 'app/reducers';
import { createActionWithModel, TURNOUT_ACTIONS_PREFIX } from 'app/actions/models';
import { BackendTurnout } from 'app/consts/interfaces/turnout';

export default class TurnoutService extends AbstractService<ModelTurnout, {}, {}> {

    public handleRequestChange(turnoutUId: string, position: BackendTurnout.EndPosition) {
        const turnout = this.findByUId(turnoutUId);

        turnout.setRequestedPosition(position);
        this.reduxProps.dispatch.update(turnout);
        setTimeout(() => {
            turnout.setCurrentPosition(position);
            this.reduxProps.dispatch.update(turnout);
        }, 2000);
    }

    protected mapDispatch(dispatch: Dispatch<Action<string>>) {

        return {
            init: (modelTurnout: ModelTurnout) => dispatch(createActionWithModel(TURNOUT_ACTIONS_PREFIX, 'ACTION_INIT')(modelTurnout)),
            update: (modelTurnout: ModelTurnout) => dispatch(createActionWithModel(TURNOUT_ACTIONS_PREFIX, 'ACTION_UPDATE')(modelTurnout)),
        };
    }

    protected mapState(state: CombinedState<AppStore>) {
        return {
            models: state.turnouts,
        };
    }

    protected getModelClass(): { new(row: any): ModelTurnout } {
        return ModelTurnout;
    }

    protected getTableName(): string {
        return 'turnout';
    }
}
