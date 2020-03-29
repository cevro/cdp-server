import {RequestedTurnoutPosition} from '../points';
import {TurnoutState} from '../interfaces';
import {
    Message
} from '../messages';

export namespace TurnoutMessages {

    export type TurnoutMessage<T> = Message<T>;

    /* *********** client->server ************************/

    interface ChangePositionData {
        id: number;
        requestedPosition: RequestedTurnoutPosition;
    }

    export type ChangePositionRequest = TurnoutMessage<ChangePositionData>;

    export type RequestsType = ChangePositionRequest;

    /* *********** server->client ************************/

    export type StateUpdateData = TurnoutState;
}
