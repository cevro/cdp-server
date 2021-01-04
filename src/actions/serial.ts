import { SerialMessage } from 'app/serialConnector';
import { Action } from 'redux';

export interface ActionSerialMessage extends Action<string> {
    message: SerialMessage;
}

export interface ActionSerialMessageId extends Action<string> {
    messageId: string;
}

export const addToSent = (message: SerialMessage): ActionSerialMessage => {
    return {
        type: '@serial/ADD_TO_SENT',
        message,
    };
};

export const addReceived = (message: SerialMessage): ActionSerialMessage => {
    return {
        type: '@serial/ADD_RECEIVED',
        message,
    };
};

export const sendSuccess = (messageId: string): ActionSerialMessageId => {
    return {
        type: '@serial/SEND_SUCCESS',
        messageId,
    };
};

export const receiveHandled = (messageId: string): ActionSerialMessageId => {
    return {
        type: '@serial/RECEIVE_HANDLED',
        messageId,
    };
};
