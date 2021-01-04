import { BackendApproval } from 'app/consts/interfaces/approval';
import { Action, CombinedState, Dispatch } from 'redux';
import { AppStore } from 'app/reducers';
import ModelBiAutoBlock from 'app/schema/autoBlock/modelBiAutoBlock';
import ModelTrackApproval from 'app/schema/tractApproval/modelTrackApproval';

export default class ModelBiAutoBlockApproval extends ModelTrackApproval {

    public readonly autoBlock: ModelBiAutoBlock;

    constructor(id: number, autoBlock: ModelBiAutoBlock) {
        super({approvalId: id, approvalUId: id.toString()});
        this.autoBlock = autoBlock;
    }

    public getPosition(): BackendApproval.AvailablePosition {
        return this.autoBlock.getDir();
    }

    protected mapDispatch(dispatch: Dispatch<Action<string>>): any {
    }

    protected mapState(state: CombinedState<AppStore>): any {
    }
}
