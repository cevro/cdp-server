import ModelTurnout from './modelTurnout';
import { RequestedTurnoutPosition } from 'app/consts/turnouts';
import TurnoutService from 'app/schema/services/turnoutService';

export interface TurnoutPositionDef {
    turnout: ModelTurnout;
    position: RequestedTurnoutPosition;
}

export default class TurnoutPosition {
    private turnoutService: TurnoutService;

    constructor(turnoutService: TurnoutService) {
    }

    public create(id: number, position: RequestedTurnoutPosition): TurnoutPositionDef {
        return {turnout: this.turnoutService.findById(id), position: position};
    }
}
