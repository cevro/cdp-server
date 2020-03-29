import {turnouts} from '@definitions/points';
import Turnout from '../objects/Turnout/Turnout';
import {TurnoutMessages} from '@definitions/messages/turnout';
import LocoNetObjectsFactory from './LocoNetObjectsFactory';
import {Message} from '@definitions/messages';
import LocoNetObject from '../objects/LocoNetObject';

class PointsFactory extends LocoNetObjectsFactory<TurnoutMessages.RequestsType, TurnoutMessages.StateUpdateData> {

    private readonly turnouts: Turnout[];

    constructor() {
        super();
        this.turnouts = turnouts.map((value => {
            return new Turnout(value);
        }));
    }

    protected getObjects(): LocoNetObject<Message, any>[] {
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
