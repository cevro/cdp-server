import ModelTurnout from './modelTurnout';
import TurnoutService from 'app/schema/services/turnoutService';
import EndPosition = BackendTurnout.EndPosition;
import { BackendTurnout } from 'app/consts/interfaces';

export interface TurnoutPositionDef {
    turnout: ModelTurnout;
    position: EndPosition;
}

export default class TurnoutPosition {
    private turnoutService: TurnoutService;

    constructor(turnoutService: TurnoutService) {
        this.turnoutService = turnoutService;
    }

    public create(id: number, position: EndPosition): TurnoutPositionDef {
        return {turnout: this.turnoutService.findById(id), position: position};
    }
}
