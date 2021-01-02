import ModelSignal from './modelSignal';
import ModelSector from './modelSector';
import { BackendTurnout } from 'app/consts/interfaces/turnout';
import EndPosition = BackendTurnout.EndPosition;
import ModelTurnout from 'app/schema/models/modelTurnout';
import AbstractModel from 'app/schema/models/abstractModel';
import ModelTrackApproval from 'app/schema/models/tractApproval/modelTrackApproval';
import { TrainRouteDefinition } from 'app/schema/services/routeService';

export interface TurnoutPosition {
    turnout: ModelTurnout;
    position: EndPosition;
}

export interface ApprovalPosition {
    approval: ModelTrackApproval;
    position: 'F' | 'R';
}

export default class ModelRoute extends AbstractModel<{}> {
    public readonly name: string;
    public readonly speed: BackendRoute.Speed;
    public readonly sufficientDistance: boolean;

    public readonly startSignal: ModelSignal;
    public readonly endSignal: ModelSignal | null;

    public readonly sectors: ModelSector[];
    public readonly turnoutPositions: TurnoutPosition[];
    public readonly trackApproval: ApprovalPosition | null;

    private readonly routeId: number;
    private readonly routeUId: string;


    constructor(
        row: BackendRoute.Row,
        def: TrainRouteDefinition,
        startSignal: ModelSignal,
        endSignal: ModelSignal | null,
        turnoutPositions: TurnoutPosition[],
        sectors: ModelSector[],
        trackApproval: ApprovalPosition | null,
    ) {
        super('route');
        this.routeId = row.route_id;
        this.routeUId = row.route_uid;
        this.name = row.name;
        this.speed = row.speed;
        this.sufficientDistance = row.sufficient_distance;

        this.endSignal = endSignal;
        this.startSignal = startSignal;
        this.sectors = sectors;
        this.trackApproval = trackApproval;
        this.turnoutPositions = turnoutPositions;
        this.registerListeners();
    }

    public getUId(): string {
        return this.routeUId;
    }

    public toArray(): {} {
        return {};
    }

    private registerListeners(): void {
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
