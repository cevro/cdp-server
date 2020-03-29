import {Message} from '@definitions/messages';
import BiDirAB from '../objects/AB/BiDirAB';
import LocoNetObjectsFactory from './LocoNetObjectsFactory';
import LocoNetObject from '../objects/LocoNetObject';

class BiDirABsFactory extends LocoNetObjectsFactory<Message, any> {
    private readonly biDirABs: BiDirAB[];

    constructor() {
        super();
        this.biDirABs = [{locoNetId: 450}, {locoNetId: 451}].map((value) => {
            return new BiDirAB(value);
        });
    }

    protected getObjects(): LocoNetObject<Message, any>[] {
        return this.biDirABs;
    }

}

export const biDirAutoBlockFactory = new BiDirABsFactory();
