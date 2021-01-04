import AbstractModel from 'app/schema/models/abstractModel';
import { BackendTurnout } from 'app/consts/interfaces/turnout';
import { Action, Dispatch } from 'redux';

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

    private currentPosition: BackendTurnout.Position = 'U';
    private requestedPosition: BackendTurnout.EndPosition | null = null;

    constructor(row: Row) {
        super();
        this.name = row.name;
        this.turnoutId = row.turnout_id;
        this.turnoutUId = row.turnout_uid;
        this.basePosition = row.base_position;
    }

    public setCurrentPosition(position: BackendTurnout.Position): void {
        this.currentPosition = position;
    }

    public setRequestedPosition(position: BackendTurnout.EndPosition): void {
        this.requestedPosition = position;
    }

    public getCurrentPosition(): BackendTurnout.Position {
        return this.currentPosition;
    }

    public getRequestedPosition(): BackendTurnout.EndPosition {
        return this.requestedPosition;
    }

    public isLocked(): boolean {
        return false;
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

    protected mapDispatch(dispatch: Dispatch<Action<string>>) {
        return;
        /*  return {
              onInit: () => dispatch(TurnoutActions.init(this.getUId())),
              onChangePosition: (position: BackendTurnout.Position) =>
                  dispatch(TurnoutActions.positionChanged(this.getUId(), position)),
              onRequestChangePosition: (position: BackendTurnout.EndPosition) =>
                  dispatch(TurnoutActions.requestChangePosition(this.getUId(), position)),
          };*/
    }

    protected mapState(state) {
    }
}
