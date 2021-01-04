import ModelBiAutoBlock from 'app/schema/autoBlock/modelBiAutoBlock';

export default class BiAutoBlockService /*extends LocoNetObjectsFactory<Message, BiDirABState> */ {
    private readonly biDirABs: ModelBiAutoBlock[];

    constructor() {
        // super();
        this.biDirABs = [{locoNetId: 450}, {locoNetId: 451}].map((value) => {
            return new ModelBiAutoBlock();
        });
    }

    protected getObjects(): ModelBiAutoBlock[] {
        return this.biDirABs;
    }

}
