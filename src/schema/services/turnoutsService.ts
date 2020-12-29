import Turnout from '../models/turnout';
import { getAllTurnouts } from 'app/consts/turnouts';

class TurnoutsService /*extends LocoNetObjectsFactory<Message, TurnoutState>*/ {

    private readonly turnouts: Turnout[];

    constructor() {
        // super();
        this.turnouts = getAllTurnouts().map((value => {
            return new Turnout(value);
        }));
    }

    public findById(id: number): Turnout {
        for (const index in this.turnouts) {
            if (this.turnouts.hasOwnProperty(index)) {
                //    if (this.turnouts[index].getLocoNetId() === id) {
                //        return this.turnouts[index];
                //    }
            }
        }
        throw new Error();
    }
}

export const turnoutsService = new TurnoutsService();
