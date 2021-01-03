import { Action } from 'redux';
import { BackendRouteLock } from 'app/consts/interfaces/routeLock';

export namespace RouteBuilderActions {
    import BuildOptions = BackendRouteLock.BuildOptions;
    export const ACTION_ADD_ROUTE = '@route-builder/ACTION_ADD_ROUTE';

    export interface ActionAddRoute extends Action<string> {
        buildOptions: BuildOptions;
        routeUId: string;
    }

    export const addRoute = (routeUId: string, buildOptions: BuildOptions): ActionAddRoute => {
        return {
            type: ACTION_ADD_ROUTE,
            buildOptions,
            routeUId,
        };
    };
    export const ACTION_CHANGE_LOCK_STATE = '@route-builder/ACTION_CHANGE_LOCK_STATE';

    export interface ActionChangeLockState extends Action<string> {
        state: BackendRouteLock.State;
        lockUId: string;
    }

    export const changeLockState = (lockUId: string, state: BackendRouteLock.State) => {
        return {
            type: ACTION_CHANGE_LOCK_STATE,
            lockUId,
            state,
        };
    };
}
