import Turnout from './turnout';
import { RequestedTurnoutPosition } from 'app/consts/turnouts';
import { turnoutsService } from 'app/schema/services/turnoutsService';

export interface TurnoutPositionDef {
    turnout: Turnout;
    position: RequestedTurnoutPosition;
}

export default class TurnoutPosition {

    public static create(id: number, position: RequestedTurnoutPosition): TurnoutPositionDef {
        return {turnout: turnoutsService.findById(id), position: position};
    }
}
