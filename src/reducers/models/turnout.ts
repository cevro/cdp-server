import { TURNOUT_ACTIONS_PREFIX } from 'app/actions/models';
import ModelTurnout from 'app/schema/models/modelTurnout';
import { ModelReducer } from 'app/reducers/models/modelReducer';

export class TurnoutReducer extends ModelReducer<ModelTurnout> {
    protected actionPrefix(): string {
        return TURNOUT_ACTIONS_PREFIX;
    }
}
