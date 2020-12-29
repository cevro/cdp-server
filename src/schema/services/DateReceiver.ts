export interface LocoNetMessage {
    locoNetId: number,
    type: string,
    value: number
}

export interface LocoNetReceiver {
    handleLocoNetReceive(message: LocoNetMessage): void;
}
