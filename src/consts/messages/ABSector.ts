import {LocoNetDefinition} from '../interfaces';
import {
    Message,
} from '../messages';

export type ABSectorMessage<T> = Message<T>;

/* *********** client->server ************************/
export interface SetBlockConditionData extends LocoNetDefinition {
    state: number;
}

export type RemoveErrorData = LocoNetDefinition;

export type SetBlockConditionMessage = ABSectorMessage<SetBlockConditionData>
export type RemoveErrorMessage = ABSectorMessage<RemoveErrorData>;

export type ClientToServerMessages = RemoveErrorMessage | SetBlockConditionMessage;

/* *********** server->client ************************/

export interface StateUpdateData extends LocoNetDefinition {
    state: number;
    errorCode: number,
    errorMessage: string,
    active: number,
    blockCondition: number;
}

