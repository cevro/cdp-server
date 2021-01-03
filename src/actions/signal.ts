import { Action } from 'redux';

export namespace SignalActions {
    export const ACTION_ASPECT_CHANGED = '@signal/ACTION_ASPECT_CHANGED';
    export const ACTION_INIT = '@signal/ACTION_INIT';
    export const ACTION_REQUEST_CHANGE_ASPECT = '@signal/ACTION_REQUEST_CHANGE_ASPECT';

    export interface ActionSignalInit extends Action<string> {
        signalUId: string;
    }

    export interface ActionChangeAspect extends Action<string> {
        signalUId: string;
        aspect: number;
    }

    export const init = (signalUId: string): ActionSignalInit => {
        return {
            type: ACTION_INIT,
            signalUId,
        };
    };

    export const aspectChanged = (signalUId: string, aspect: number): ActionChangeAspect => {
        return {
            type: ACTION_ASPECT_CHANGED,
            aspect,
            signalUId,
        };
    };

    export const requestChangeAspect = (signalUId: string, aspect: number): ActionChangeAspect => {
        return {
            type: ACTION_REQUEST_CHANGE_ASPECT,
            aspect,
            signalUId,
        };
    };
}
