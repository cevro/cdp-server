import { BackendApproval } from 'app/consts/interfaces/approval';
import ModelTrackApproval from 'app/schema/models/tractApproval/modelTrackApproval';
import ModelBiAutoBlock from 'app/schema/models/modelBiAutoBlock';

export default class ModelBiAutoBlockApproval extends ModelTrackApproval {

    public readonly autoBlock: ModelBiAutoBlock;

    constructor(id: number, autoBlock: ModelBiAutoBlock) {
        super({approvalId: id, approvalUId: id.toString()});
        this.autoBlock = autoBlock;
    }

    public getPosition(): BackendApproval.AvailablePosition {
        return this.autoBlock.getDir();
    }
}
