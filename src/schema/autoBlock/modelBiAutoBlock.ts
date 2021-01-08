import { BackendApproval } from 'app/consts/interfaces/approval';
import AbstractModel from 'app/schema/models/abstractModel';
import SerialConnector from 'app/serialConnector';

export default class ModelBiAutoBlock extends AbstractModel {
    private readonly dir: BackendApproval.AvailablePosition;

    constructor(serial: SerialConnector) {
        super(serial);
        this.dir = 'U';
    }

    public getDir(): BackendApproval.AvailablePosition {
        return this.dir;
    }

    public getUId(): string {
        return '';
    }

    public toArray(): {} {
        return {};
    }
}
