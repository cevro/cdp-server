import Turnout from '../objects/Turnout/Turnout';
import LocoNetObjectsFactory from './LocoNetObjectsFactory';
import {Message} from '@definitions/messages';
import {getAllTurnouts} from "@app/consts/turnouts";
import {TurnoutState} from "@app/consts/interfaces";

class PointsFactory extends LocoNetObjectsFactory<Message, TurnoutState> {

    private readonly turnouts: Turnout[];

    constructor() {
        super();
        this.turnouts = getAllTurnouts().map((value => {
            return new Turnout(value);
        }));
    }

    protected getObjects(): Turnout[] {
        return this.turnouts;
    }

    public findById(id: number): Turnout {
        for (const index in this.turnouts) {
            if (this.turnouts.hasOwnProperty(index)) {
                if (this.turnouts[index].getLocoNetId() === id) {
                    return this.turnouts[index];
                }
            }
        }
        throw new Error();
    }
}

export const turnoutsFactory = new PointsFactory();
