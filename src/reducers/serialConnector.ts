import { Action } from 'redux';
import { SerialMessage } from 'app/serialConnector';
import { MapObjects } from 'app/consts/messages';
import { ActionSerialMessage, ActionSerialMessageId } from 'app/actions/serial';

export interface SerialConnectorState {
    toSent: MapObjects<SerialMessage>;
    received: MapObjects<SerialMessage>;
}

const initState: SerialConnectorState = {
    toSent: {},
    received: {},
};

const addToSent = (state: SerialConnectorState = initState, action: ActionSerialMessage): SerialConnectorState => {
    return {
        ...state,
        toSent: {
            ...state.toSent,
            [action.message.uId + ':' + (new Date()).getTime()]: action.message,
        },
    };
};

const addReceived = (state: SerialConnectorState = initState, action: ActionSerialMessage): SerialConnectorState => {
    return {
        ...state,
        received: {
            ...state.received,
            [action.message.uId + ':' + (new Date()).getTime()]: action.message,
        },
    };
};
const sendSuccess = (state: SerialConnectorState = initState, action: ActionSerialMessageId): SerialConnectorState => {
    const toSent = {};
    for (const key in state.toSent) {
        if (state.toSent.hasOwnProperty(key)) {
            if (key !== action.messageId) {
                toSent[key] = state.toSent[key];
            }
        }
    }
    return {
        ...state,
        toSent,
    };
};

const receiveHandled = (state: SerialConnectorState = initState, action: ActionSerialMessageId): SerialConnectorState => {
    const received = {};
    for (const key in state.toSent) {
        if (state.toSent.hasOwnProperty(key)) {
            if (key !== action.messageId) {
                received[key] = state.toSent[key];
            }
        }
    }
    return {
        ...state,
        received,
    };
};

export const serialConnector = (state: SerialConnectorState = initState, action: Action<string>): SerialConnectorState => {

    switch (action.type) {
        case '@serial/ADD_TO_SENT':
            return addToSent(state, action);
        case '@serial/SEND_SUCCESS':
            return sendSuccess(state, action);
        case '@serial/ADD_RECEIVED':
            return addReceived(state, action);
        case '@serial/RECEIVE_HANDLED':
            return receiveHandled(state, action);
        default:
            return state;
    }
};
