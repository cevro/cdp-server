import {Message} from '@definitions/messages';

export interface HttpReceiver<M extends Message> {
    handleGet?(message: Message): void,

    handlePost?(message: Message): void,

    handlePatch?(message: Message): void,

    handleDelete?(message: Message): void,
}

export interface LocoNetMessage {
    locoNetId: number,
    type: string,
    value: number
}

export interface LocoNetReceiver {
    handleLocoNetReceive(message: LocoNetMessage): void;
}
