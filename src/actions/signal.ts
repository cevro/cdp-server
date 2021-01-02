import { Action } from 'redux';

export const ACTION_ASPECT_CHANGED = 'ACTION_ASPECT_CHANGED';
export const ACTION_INIT_SIGNAL = 'ACTION_INIT_SIGNAL';

export interface ActionSignalInit extends Action<string> {
    signalUId: string;
}

export interface ActionAspectChanged extends Action<string> {
    signalUId: string;
    aspect: number;
}

export const initSignal = (signalUId: string): ActionSignalInit => {
    return {
        type: ACTION_INIT_SIGNAL,
        signalUId,
    };
};

export const aspectChanged = (signalUId: string, aspect: number): ActionAspectChanged => {
    return {
        type: ACTION_ASPECT_CHANGED,
        aspect,
        signalUId,
    };
};
