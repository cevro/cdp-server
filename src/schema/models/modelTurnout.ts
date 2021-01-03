import { ENTITY_TURNOUT } from 'app/consts/entity';
import AbstractModel from 'app/schema/models/abstractModel';
import { BackendTurnout } from 'app/consts/interfaces/turnout';
import { Action, CombinedState, Dispatch } from 'redux';
import { AppStore } from 'app/reducers';
import { TurnoutActions } from 'app/actions/turnout';
import { ReduxProps } from 'app/reduxConnector';
import { BackendSignal } from 'app/consts/interfaces/signal';

interface DispatchState {
    onInit(): void;

    onChangePosition(position: BackendTurnout.Position): void;

    onRequestChangePosition(position: BackendTurnout.EndPosition): void;
}

export default class ModelTurnout extends AbstractModel<BackendTurnout.Definition, BackendTurnout.State, DispatchState> {

    private readonly name: string;
    private readonly turnoutUId: string;
    private readonly turnoutId: number;
    private readonly basePosition: BackendTurnout.EndPosition;

    constructor(row: BackendTurnout.Row) {
        super(ENTITY_TURNOUT);
        this.name = row.name;
        this.turnoutId = row.turnout_id;
        this.turnoutUId = row.turnout_uid;
        this.basePosition = row.base_position;
        this.connect();

    }

    protected reduxDidConnected() {
        super.reduxDidConnected();
        this.reduxProps.dispatch.onInit();
        this.reduxProps.dispatch.onRequestChangePosition('S');
    }

    protected reduxPropsWillUpdate(newProps: ReduxProps<BackendTurnout.State, DispatchState>) {
        super.reduxPropsWillUpdate(newProps);
        if (this.reduxProps.state && newProps.state && this.reduxProps.state.requestedPosition !== newProps.state.requestedPosition) {
            setTimeout(() => {
                this.reduxProps.dispatch.onChangePosition(newProps.state.requestedPosition);
            }, 2000);
        }
    }

    public toArray(): BackendTurnout.Definition {
        return {
            name: this.name,
            turnoutId: this.turnoutId,
            turnoutUId: this.turnoutUId,
            basePosition: this.basePosition,
        };
    }

    public getUId(): string {
        return this.turnoutUId;
    }

    protected mapDispatch(dispatch: Dispatch<Action<string>>): DispatchState {
        return {
            onInit: () => dispatch(TurnoutActions.init(this.getUId())),
            onChangePosition: (position: BackendTurnout.Position) =>
                dispatch(TurnoutActions.positionChanged(this.getUId(), position)),
            onRequestChangePosition: (position: BackendTurnout.EndPosition) =>
                dispatch(TurnoutActions.requestChangePosition(this.getUId(), position)),
        };
    }

    protected mapState(state: CombinedState<AppStore>): BackendTurnout.State {
        return {
            ...state.turnouts[this.getUId()],
        };
    }
}
