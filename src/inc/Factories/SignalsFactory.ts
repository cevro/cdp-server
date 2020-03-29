import Signal from '../objects/Signal';
import {
    SignalState,
} from '@definitions/interfaces';
import {signals} from '@app/data/signals';
import {Message} from '@definitions/messages';
import LocoNetObjectsFactory from './LocoNetObjectsFactory';
import LocoNetObject from '../objects/LocoNetObject';

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

    protected getObjects(): LocoNetObject<Message, any>[] {
        return this.signals;
    }
}

export const signalFactory = new SignalsFactory();
