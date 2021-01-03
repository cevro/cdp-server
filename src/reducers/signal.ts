import { Action } from 'redux';
import { Aspect, BackendSignal } from 'app/consts/interfaces/signal';
import { SignalActions } from 'app/actions/signal';

export interface SignalsState {
    [signalUId: string]: BackendSignal.State;
}

const aspectChanged = (state: SignalsState, action: SignalActions.ActionChangeAspect): SignalsState => {
    const {signalUId, aspect} = action;
    return {
        ...state,
        [signalUId]: {
            ...state[action.signalUId],
            displayedAspect: aspect,
        },
    };
};

const requestChange = (state: SignalsState, action: SignalActions.ActionChangeAspect): SignalsState => {
    const {signalUId, aspect} = action;
    return {
        ...state,
        [signalUId]: {
            ...state[action.signalUId],
            requestedAspect: aspect,
        },
    };
};

const initSignalState = {
    displayedAspect: Aspect.UNDEFINED,
    requestedAspect: Aspect.UNDEFINED,
};

const initSignal = (state: SignalsState, action: SignalActions.ActionSignalInit): SignalsState => {
    const {signalUId} = action;
    return {
        ...state,
        [signalUId]: initSignalState,
    };
};

export function signals<A extends Action<string>>(state: SignalsState = {}, action: A): SignalsState {
    const {type} = action;
    switch (type) {
        case SignalActions.ACTION_ASPECT_CHANGED:
            // @ts-ignore
            return aspectChanged(state, action);
        case SignalActions.ACTION_INIT:
            // @ts-ignore
            return initSignal(state, action);
        case SignalActions.ACTION_REQUEST_CHANGE_ASPECT:
            // @ts-ignore
            return requestChange(state, action);
        default:
            return state;
    }
}
