import AbstractModel from 'app/schema/models/abstractModel';
import { ActionWithModel } from 'app/reducers/models/modelReducer';

export function createActionWithModel<M extends AbstractModel<any>>(
    prefix: string,
    action: 'ACTION_INIT' | 'ACTION_UPDATE',
): (mode: M) => ActionWithModel<M> {
    return (model: M): ActionWithModel<M> => {
        return {
            type: prefix + '/' + action,
            model,
        };
    };
}

export const ACTIONS_UPDATE_SUFFIX = 'ACTION_UPDATE';
export const ACTIONS_INIT_SUFFIX = 'ACTION_INIT';

export const SIGNAL_ACTIONS_PREFIX = '@signal';

export const TURNOUT_ACTIONS_PREFIX = '@turnout';

export const SECTOR_ACTIONS_PREFIX = '@sector';
