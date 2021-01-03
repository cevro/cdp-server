import { BackendTurnout } from 'app/consts/interfaces/turnout';
import EndPosition = BackendTurnout.EndPosition;
import AbstractModel from 'app/schema/models/abstractModel';
import ModelTrackApproval from 'app/schema/models/tractApproval/modelTrackApproval';
import { TrainRouteDefinition } from 'app/schema/services/routeService';
import { Action, CombinedState, Dispatch } from 'redux';
import { AppStore } from 'app/reducers';
import { BackendSignal } from 'app/consts/interfaces/signal';
import { MapObjects } from 'app/consts/messages';
import { BackendSector } from 'app/consts/interfaces/sector';
import { TurnoutActions } from 'app/actions/turnout';
import { SignalActions } from 'app/actions/signal';
import requestChangeAspect = SignalActions.requestChangeAspect;

export interface TurnoutPosition {
    turnoutUId: string;
    position: EndPosition;
}

export interface ApprovalPosition {
    approval: ModelTrackApproval;
    position: 'F' | 'R';
}

export default class ModelRoute extends AbstractModel<{}, {
    endSignal: BackendSignal.State;
    sectors: MapObjects<BackendSector.State>;
    turnouts: MapObjects<BackendTurnout.State>;
}, {
    onRequestSignalChange(signalUId: string, aspect: number): void;
    onRequestTurnoutChange(turnoutUId: string, position: BackendTurnout.EndPosition): void;
}> {
    public readonly name: string;
    public readonly speed: BackendRoute.Speed;
    public readonly sufficientDistance: boolean;

    public readonly startSignalUId: string;
    public readonly endSignalUId: string | null;

    public readonly sectorsUIds: string[];
    public readonly turnoutPositions: TurnoutPosition[];
    public readonly trackApproval: ApprovalPosition | null;

    private readonly routeId: number;
    private readonly routeUId: string;

    constructor(
        row: BackendRoute.Row,
        def: TrainRouteDefinition,
        startSignal: string,
        endSignal: string | null,
        turnoutPositions: TurnoutPosition[],
        sectors: string[],
        trackApproval: ApprovalPosition | null,
    ) {
        super('route');
        this.routeId = row.route_id;
        this.routeUId = row.route_uid;
        this.name = row.name;
        this.speed = row.speed;
        this.sufficientDistance = row.sufficient_distance;

        this.endSignalUId = endSignal;
        this.startSignalUId = startSignal;
        this.sectorsUIds = sectors;
        this.trackApproval = trackApproval;
        this.turnoutPositions = turnoutPositions;
        this.connect();
    }

    public getUId(): string {
        return this.routeUId;
    }

    public toArray(): {} {
        return {};
    }

    protected mapState(state: CombinedState<AppStore>) {
        const sectors = {};
        const turnouts = {};
        this.turnoutPositions.forEach(({turnoutUId}) => {
            turnouts[turnoutUId] = state.turnouts[turnoutUId];
        });
        return {
            endSignal: {
                ...state.signals[this.endSignalUId],
            },
            sectors,
            turnouts,
        };
    }

    protected mapDispatch(dispatch: Dispatch<Action<string>>) {
        return {
            onRequestSignalChange: (signalUId: string, aspect: number) => dispatch(requestChangeAspect(signalUId, aspect)),
            onRequestTurnoutChange: (turnoutUId: string, position: BackendTurnout.EndPosition) =>
                dispatch(TurnoutActions.requestChangePosition(turnoutUId, position)),
        };
    }

    public checkSectors(state: BackendSector.States): boolean {
        for (const sectorUId of this.sectorsUIds) {
            if (!this.reduxProps.state.sectors[sectorUId]) {
                return false;
            }
            if (this.reduxProps.state.sectors[sectorUId].state !== state) {
                return false;
            }
        }
        return true;
    }

    public checkTurnouts(): boolean {
        for (const {turnoutUId, position} of this.turnoutPositions) {
            if (!this.reduxProps.state.turnouts[turnoutUId]) {
                return false;
            }
            if (this.reduxProps.state.turnouts[turnoutUId].currentPosition !== position) {
                return false;
            }
        }
        return true;
    }

    public switchTurnouts(): void {
        for (const {turnoutUId, position} of this.turnoutPositions) {
            this.reduxProps.dispatch.onRequestTurnoutChange(turnoutUId, position);
        }
        return;
    }

    public changeAspect(aspect: number): void {
        this.reduxProps.dispatch.onRequestSignalChange(this.startSignalUId, aspect);
    }
}

export namespace BackendRoute {
    export interface Row {
        route_id: number;
        route_uid: string;
        name: string;
        speed: Speed;
        sufficient_distance: boolean;
    }

    export type Speed = 40 | null;
}
