import AbstractModel from 'app/schema/models/abstractModel';
import { BackendTurnout } from 'app/consts/interfaces/turnout';
import SerialConnector from 'app/serialConnector';

interface Row {
    turnout_id: number;
    turnout_uid: string;
    name: string;
    base_position: BackendTurnout.EndPosition;
}

export default class ModelTurnout extends AbstractModel<BackendTurnout.Definition, Row> {

    private readonly name: string;
    private readonly turnoutUId: string;
    private readonly turnoutId: number;
    private readonly basePosition: BackendTurnout.EndPosition;

    private _currentPosition: BackendTurnout.Position = 'U';
    private _requestedPosition: BackendTurnout.EndPosition | null = null;

    private _locked: boolean = false;

    public constructor(serial: SerialConnector, row: Row) {
        super(serial);
        this.name = row.name;
        this.turnoutId = row.turnout_id;
        this.turnoutUId = row.turnout_uid;
        this.basePosition = row.base_position;
        this.getContainer().emit('@turnout/model-created');
    }

    public set currentPosition(position: BackendTurnout.Position) {
        this._currentPosition = position;
        this.getContainer().emit('@turnout/position-changed');
    }

    public set requestedPosition(position: BackendTurnout.EndPosition) {
        this._requestedPosition = position;
        this.getContainer().emit('@turnout/position-requested');
        setTimeout(() => {
            this.currentPosition = position;
        }, 2000);
    }

    public get currentPosition(): BackendTurnout.Position {
        return this._currentPosition;
    }

    public get requestedPosition(): BackendTurnout.EndPosition {
        return this._requestedPosition;
    }

    public get locked(): boolean {
        return this._locked;
    }

    public set locked(state: boolean) {
        this._locked = state;
    }

    public toArray() {
        return {
            name: this.name,
            turnoutId: this.turnoutId,
            turnoutUId: this.turnoutUId,
            basePosition: this.basePosition,
            currentPosition: this.currentPosition,
            requestedPosition: this.requestedPosition,
        };
    }

    public getUId(): string {
        return this.turnoutUId;
    }

}
