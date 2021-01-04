import ModelSignal from 'app/schema/models/modelSignal';
import { ModelReducer } from 'app/reducers/models/modelReducer';
import { SIGNAL_ACTIONS_PREFIX } from 'app/actions/models';

export class SignalReducer extends ModelReducer<ModelSignal> {

    protected actionPrefix(): string {
        return SIGNAL_ACTIONS_PREFIX;
    }
}
