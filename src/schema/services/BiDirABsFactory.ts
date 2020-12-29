import BiDirAB from '../models/autoBlock/BiDirAB';

class BiDirABsFactory /*extends LocoNetObjectsFactory<Message, BiDirABState> */ {
    private readonly biDirABs: BiDirAB[];

    constructor() {
        // super();
        this.biDirABs = [{locoNetId: 450}, {locoNetId: 451}].map((value) => {
            return new BiDirAB(value);
        });
    }

    protected getObjects(): BiDirAB[] {
        return this.biDirABs;
    }

}

export const biDirAutoBlockFactory = new BiDirABsFactory();
