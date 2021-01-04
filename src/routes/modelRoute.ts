import { BackendTurnout } from 'app/consts/interfaces/turnout';
import EndPosition = BackendTurnout.EndPosition;
import { CombinedState } from 'redux';
import { AppStore } from 'app/reducers';
import { TrainRouteDefinition } from 'app/routes/routeService';
import ModelTrackApproval from 'app/schema/tractApproval/modelTrackApproval';

export interface TurnoutPosition {
    turnoutUId: string;
    position: EndPosition;
}

export interface ApprovalPosition {
    approval: ModelTrackApproval;
    position: 'F' | 'R';
}

export default class ModelRoute /*extends AbstractModel */{
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
       // super();
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
