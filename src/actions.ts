export namespace Actions {
    export namespace Serial {
        /**
         * file sending message to serial port
         */
        export const MESSAGE_SEND = '@serial/message-send';
        /**
         * trigger when message arrive
         */
        export const MESSAGE_RECEIVE = '@serial/message-receive';
    }
    export namespace Signal {
        export const MODEL_CREATED = '@signal/model-created';
        export const ASPECT_CHANGED = '@signal/aspect-changed';
        export const ASPECT_REQUESTED = '@signal/aspect-requested';
    }

    export namespace Turnout {
        export const MODEL_CREATED = '@turnout/model-created';
        export const POSITION_CHANGED = '@turnout/position-changed';
        export const POSITION_REQUESTED = '@turnout/position-requested';
    }

    export namespace Sector {
        export const MODEL_CREATED = '@sector/model-created';
        export const LOCKED_CHANGED = '@sector/locked-changed';
        export const OCCUPIED_CHANGED = '@sector/occupied-changed';
    }

    export const getAll = (): string[] => {
        return [
            // Serial
            Actions.Serial.MESSAGE_SEND,
            Actions.Serial.MESSAGE_RECEIVE,
            // Signals
            Actions.Signal.MODEL_CREATED,
            Actions.Signal.ASPECT_CHANGED,
            Actions.Signal.ASPECT_REQUESTED,
            // Turnouts
            Actions.Turnout.MODEL_CREATED,
            Actions.Turnout.POSITION_CHANGED,
            Actions.Turnout.POSITION_REQUESTED,
            // Sector
            Actions.Sector.MODEL_CREATED,
            Actions.Sector.OCCUPIED_CHANGED,
            Actions.Sector.LOCKED_CHANGED,
        ];
    };
}
