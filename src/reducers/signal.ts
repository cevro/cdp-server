import { Action } from 'redux';
import { Aspect, BackendSignal } from 'app/consts/interfaces/signal';
import { ACTION_ASPECT_CHANGED, ACTION_INIT_SIGNAL, ActionAspectChanged, ActionSignalInit } from 'app/actions/signal';

export interface SignalsState {
    [signalUId: string]: BackendSignal.State;
}

const aspectChanged = (state: SignalsState, action: ActionAspectChanged): SignalsState => {
    const {signalUId, aspect} = action;
    console.log(signalUId);
    return {
        ...state,
        [signalUId]: {
            ...state[action.signalUId],
            displayedAspect: aspect,
        },
    };
};

const initSignalState = {
    displayedAspect: Aspect.UNDEFINED,
    requestedAspect: Aspect.UNDEFINED,
};

const initSignal = (state: SignalsState, action: ActionSignalInit): SignalsState => {
    const {signalUId} = action;
    console.log(signalUId);
    return {
        ...state,
        [signalUId]: initSignalState,
    };
};


export function signals<A extends Action<string>>(state: SignalsState = {}, action: A): SignalsState {
    const {type} = action;
    switch (type) {
        case ACTION_ASPECT_CHANGED:
            // @ts-ignore
            return aspectChanged(state, action);
        case ACTION_INIT_SIGNAL:
            // @ts-ignore
            return initSignal(state, action);
        default:
            return state;
    }
}

