import AbstractModel from 'app/schema/models/abstractModel';
import { MapObjects } from 'app/consts/messages';
import { Action, Reducer } from 'redux';
import { ACTIONS_INIT_SUFFIX, ACTIONS_UPDATE_SUFFIX } from 'app/actions/models';

export abstract class ModelReducer<M extends AbstractModel<any>> {

    public app(): Reducer<MapObjects<M>, ActionWithModel<M>> {
        return (state: MapObjects<M> = {}, action: ActionWithModel<M>): MapObjects<M> => {
            switch (action.type) {
                case this.actionPrefix() + '/' + ACTIONS_INIT_SUFFIX:
                    return this.init(state, action);
                case this.actionPrefix() + '/' + ACTIONS_UPDATE_SUFFIX:
                    return this.update(state, action);
                default:
                    return state;
            }
        };
    }

    protected abstract actionPrefix(): string ;

    private init(state: MapObjects<M>, action: ActionWithModel<M>): MapObjects<M> {
        const {model} = action;
        return {
            ...state,
            [model.getUId()]: model,
        };
    }

    private update(state: MapObjects<M>, action: ActionWithModel<M>): MapObjects<M> {
        const {model} = action;
        return {
            ...state,
            [model.getUId()]: model,
        };
    }
}

export interface ActionWithModel<M> extends Action<string> {
    model: M;
}
