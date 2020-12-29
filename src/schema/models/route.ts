import ModelSignal from './modelSignal';
import { TurnoutPositionDef } from './turnoutPosition';
import Sector from './sector';
import { TrainRouteDefinition } from 'app/data/puchov/routes/1L';
import { RequestedTurnoutPosition } from 'app/consts/turnouts';
import TrackApproval from 'app/schema/models/trackApproval';
import { signalService } from 'app/schema/services/signalService';
import { sectorFactory } from 'app/schema/services/sectorService';
import AspectStrategy from 'app/aspectStrategy';
import RouteLock from 'app/routeLock';

export default class Route {
    public id;
    public name: string;

    public readonly sectors: Sector[];
    public readonly turnoutPositions: TurnoutPositionDef[];
    public readonly trackApprovals: Array<{
        approval: TrackApproval;
        position: RequestedTurnoutPosition;
    }>;
    public startSignal: ModelSignal;
    public endSignal: ModelSignal;
    // public trackApproval: TrackApproval;

    public readonly endSector: Sector;

    public readonly speed: number | null;
    public sufficientDistance: boolean;

    constructor(def: TrainRouteDefinition) {
        this.id = def.id;
        this.sectors = def.sectorIds.map((id) => {
            return sectorFactory.findById(id);
        });

        this.name = def.name;
        this.turnoutPositions = def.turnoutPositions;

        this.endSignal = def.endSignalId ? signalService.findById(def.endSignalId) : null;

        this.startSignal = signalService.findById(def.startSignalId);

        this.endSector = sectorFactory.findById(def.endSectorId);
        this.speed = def.speed;
        this.sufficientDistance = def.sufficientDistance === undefined ? true : def.sufficientDistance;
    }

    public getSectors(): Sector[] {
        return this.sectors;
    };

    public alock() {
    }

    public recalculateSignal(routeLock: RouteLock): void {
        this.startSignal.requestChange(AspectStrategy.calculate(routeLock));
    }

}
