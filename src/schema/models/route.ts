import ModelSignal from './modelSignal';
import { TurnoutPositionDef } from './turnoutPosition';
import ModelSector from './modelSector';
import { TrainRouteDefinition } from 'app/data/puchov/routes/1L';
import { RequestedTurnoutPosition } from 'app/consts/turnouts';
import TrackApproval from 'app/schema/models/trackApproval';
import SectorService  from 'app/schema/services/sectorService';
import AspectStrategy from 'app/aspectStrategy';
import RouteLock from 'app/routeLock';
import SignalService from 'app/schema/services/signalService';

export default class Route {
    public id;
    public name: string;

    public readonly sectors: ModelSector[];
    public readonly turnoutPositions: TurnoutPositionDef[];
    public readonly trackApprovals: Array<{
        approval: TrackApproval;
        position: RequestedTurnoutPosition;
    }>;
    public startSignal: ModelSignal;
    public endSignal: ModelSignal;
    // public trackApproval: TrackApproval;

    public readonly endSector: ModelSector;

    public readonly speed: number | null;
    public sufficientDistance: boolean;

    constructor(def: TrainRouteDefinition, signalService: SignalService, sectorService: SectorService) {
        this.id = def.id;
        this.sectors = def.sectorIds.map((id) => {
            return sectorService.findById(id);
        });

        this.name = def.name;
        this.turnoutPositions = def.turnoutPositions;

        this.endSignal = def.endSignalId ? signalService.findById(def.endSignalId) : null;

        this.startSignal = signalService.findById(def.startSignalId);

        this.endSector = sectorService.findById(def.endSectorId);
        this.speed = def.speed;
        this.sufficientDistance = def.sufficientDistance === undefined ? true : def.sufficientDistance;
    }

    public getSectors(): ModelSector[] {
        return this.sectors;
    };

    public alock() {
    }

    public recalculateSignal(routeLock: RouteLock): void {
        this.startSignal.requestChange(AspectStrategy.calculate(routeLock));
    }

}
