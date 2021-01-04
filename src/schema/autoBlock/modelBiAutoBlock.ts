import { BackendApproval } from 'app/consts/interfaces/approval';

export default class ModelBiAutoBlock /*extends LocoNetObject<ABState>*/ {
    private readonly dir: BackendApproval.AvailablePosition;

    constructor() {
        //   super(data.locoNetId, ENTITY_BI_DIR_AB);
        this.dir = 'U';
    }

    public getDir(): BackendApproval.AvailablePosition {
        return this.dir;
    }
}
