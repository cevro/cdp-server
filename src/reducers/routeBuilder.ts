import { Action } from 'redux';
import { RouteBuilderActions } from 'app/actions/routeBuilder';
import { BackendRouteLock } from 'app/consts/interfaces/routeLock';
import BuildOptions = BackendRouteLock.BuildOptions;

export interface RouteLock {
    routeUId: string;
    buildOptions: BuildOptions;
    state: BackendRouteLock.State;
    lockUId: string;
    sectorIndex: number;
}

export interface RouteBuilderState {
    buffer: Array<RouteLock>;
}

const addRoute = (state: RouteBuilderState, action: RouteBuilderActions.ActionAddRoute): RouteBuilderState => {
    return {
        ...state,
        buffer: [
            ...state.buffer,
            {
                routeUId: action.routeUId,
                buildOptions: action.buildOptions,
                state: 'waiting',
                lockUId: action.routeUId + '-' + (new Date()).getTime(),
                sectorIndex: -1,
            },
        ],
    };
};

export const changeLockState = (state: RouteBuilderState, action: RouteBuilderActions.ActionChangeLockState): RouteBuilderState => {
    return {
        ...state,
        buffer: [
            ...state.buffer.map((lock) => {
                if (lock.lockUId === action.lockUId) {
                    return {
                        ...lock,
                        state: action.state,
                    };
                }
                return lock;
            }),
        ],
    };
};

const initState = {
    buffer: [],
};

export function routeBuilder<A extends Action<string>>(state: RouteBuilderState = initState, action: A): RouteBuilderState {
    const {type} = action;
    switch (type) {
        case RouteBuilderActions.ACTION_ADD_ROUTE:
            return addRoute(state, action);
        case RouteBuilderActions.ACTION_CHANGE_LOCK_STATE:
            return changeLockState(state, action);
        default:
            return state;
    }
}
