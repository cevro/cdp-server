import { Action } from 'redux';
import { TurnoutActions } from 'app/actions/turnout';
import { BackendTurnout } from 'app/consts/interfaces/turnout';

export interface TurnoutState {
    [turnoutUId: string]: BackendTurnout.State;
}

const changed = (state: TurnoutState, action: TurnoutActions.ActionChange): TurnoutState => {
    const {turnoutUId, position} = action;
    return {
        ...state,
        [turnoutUId]: {
            ...state[action.turnoutUId],
            currentPosition: position,
        },
    };
};

const requestChange = (state: TurnoutState, action: TurnoutActions.ActionRequestChange): TurnoutState => {
    const {turnoutUId, position} = action;
    return {
        ...state,
        [turnoutUId]: {
            ...state[action.turnoutUId],
            requestedPosition: position,
        },
    };
};

const initSignalState: BackendTurnout.State = {
    currentPosition: 'U',
    requestedPosition: null,
};

const initSignal = (state: TurnoutState, action: TurnoutActions.ActionInit): TurnoutState => {
    const {turnoutUId} = action;
    return {
        ...state,
        [turnoutUId]: initSignalState,
    };
};

export function turnouts<A extends Action<string>>(state: TurnoutState = {}, action: A): TurnoutState {
    const {type} = action;
    switch (type) {
        case TurnoutActions.ACTION_POSITION_CHANGED:
            // @ts-ignore
            return changed(state, action);
        case TurnoutActions.ACTION_INIT:
            // @ts-ignore
            return initSignal(state, action);
        case TurnoutActions.ACTION_REQUEST_CHANGE_POSITION:
            // @ts-ignore
            return requestChange(state, action);
        default:
            return state;
    }
}
