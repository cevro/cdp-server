import AbstractModel from 'app/schema/models/abstractModel';
import { BackendApproval } from 'app/consts/interfaces/approval';
import AvailablePosition = BackendApproval.AvailablePosition;
import SerialConnector from 'app/serialConnector';

export default abstract class ModelTrackApproval extends AbstractModel<BackendApproval.Snapshot> {

    public readonly approvalId: number;
    public readonly approvalUId: string;

    protected constructor(serial: SerialConnector, def: { approvalId: number; approvalUId: string; }) {
        super(serial);
        this.approvalUId = def.approvalUId;
        this.approvalId = def.approvalId;
    }

    public abstract getPosition(): AvailablePosition;

    public getUId(): string {
        return this.approvalUId;
    }

    public toArray(): BackendApproval.Snapshot {
        return {
            position: this.getPosition(),
        };
    }
}
