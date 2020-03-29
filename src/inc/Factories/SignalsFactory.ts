import Signal from '../objects/Signal';
import {signals} from '@app/data/signals';
import {Message} from '@definitions/messages';
import LocoNetObjectsFactory from './LocoNetObjectsFactory';
import LocoNetObject from '../objects/LocoNetObject';
import {SignalState} from "@app/consts/signals/interfaces";

class SignalsFactory extends LocoNetObjectsFactory<Message, SignalState> {

    private readonly signals: Signal[];

    constructor() {
        super();
        this.signals = signals.map((value => {
            return new Signal(value);
        }));
        // console.log(this.signals);
    }

    public findById(id: number): Signal {
        for (const index in this.signals) {
            if (this.signals.hasOwnProperty(index)) {
                if (this.signals[index].getLocoNetId() === id) {
                    return this.signals[index];
                }
            }
        }
        throw new Error();
    }

    protected getObjects(): Signal[] {
        return this.signals;
    }
}

export const signalFactory = new SignalsFactory();
