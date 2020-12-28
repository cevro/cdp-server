import Turnout from './Turnout';
import { RequestedTurnoutPosition } from 'app/consts/turnouts';
import { turnoutsFactory } from 'app/schema/services/TurnoutsFactory';

export interface TurnoutPositionDef {
    turnout: Turnout;
    position: RequestedTurnoutPosition;
}

export default class TurnoutPosition {

    public static create(id: number, position: RequestedTurnoutPosition): TurnoutPositionDef {
        return {turnout: turnoutsFactory.findById(id), position: position};
    }
}
