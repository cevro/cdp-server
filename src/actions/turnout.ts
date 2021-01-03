import { Action } from 'redux';
import { BackendTurnout } from 'app/consts/interfaces/turnout';

export namespace TurnoutActions {

    export const ACTION_POSITION_CHANGED = '@turnout/ACTION_POSITION_CHANGED';
    export const ACTION_INIT = '@turnout/ACTION_INIT';
    export const ACTION_REQUEST_CHANGE_POSITION = '@turnout/ACTION_REQUEST_CHANGE_POSITION';

    export interface ActionInit extends Action<string> {
        turnoutUId: string;
    }

    export interface ActionChange extends Action<string> {
        turnoutUId: string;
        position: BackendTurnout.Position;
    }
    export interface ActionRequestChange extends Action<string> {
        turnoutUId: string;
        position: BackendTurnout.EndPosition;
    }

    export const init = (turnoutUId: string): ActionInit => {
        return {
            type: ACTION_INIT,
            turnoutUId,
        };
    };

    export const positionChanged = (turnoutUId: string, position: BackendTurnout.Position): ActionChange => {
        return {
            type: ACTION_POSITION_CHANGED,
            position,
            turnoutUId,
        };
    };

    export const requestChangePosition = (turnoutUId: string, position: BackendTurnout.EndPosition): ActionRequestChange => {
        return {
            type: ACTION_REQUEST_CHANGE_POSITION,
            position,
            turnoutUId,
        };
    };
}
