import Signal from '../Signal';
import { TurnoutPositionDef } from '../Turnout/turnoutPosition';
import Sector from '../Sectors/Sector';
import { TrainRouteDefinition } from 'app/data/puchov/routes/1L';
import { BuildOptions } from '@definitions/interfaces';
import { RequestedTurnoutPosition } from 'app/consts/turnouts';
import TrackApproval from 'app/schema/models/Routes/TrackApproval';
import { signalFactory } from 'app/schema/services/signalService';
import { sectorFactory } from 'app/schema/services/SectorsFactory';
import { SignalStrategy } from 'app/schema/services/SignalStrategy';

export default class TrainRoute {
    public id;
    public name: string;

    public readonly sectors: Sector[];
    public readonly turnoutPositions: TurnoutPositionDef[];
    public readonly trackApprovals: Array<{
        approval: TrackApproval;
        position: RequestedTurnoutPosition;
    }>;
    public startSignal: Signal;
    public endSignal: Signal;
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

        this.endSignal = def.endSignalId ? signalFactory.findById(def.endSignalId) : null;

        this.startSignal = signalFactory.findById(def.startSignalId);

        this.endSector = sectorFactory.findById(def.endSectorId);
        this.speed = def.speed;
        this.sufficientDistance = def.sufficientDistance === undefined ? true : def.sufficientDistance;
    }

    public getSectors(): Sector[] {
        return this.sectors;
    };

    public alock() {
    }

    public recalculateSignal(buildOptions: BuildOptions): void {
        this.startSignal.requestChange(SignalStrategy.calculate(this.endSignal, this.speed, this.sufficientDistance, buildOptions));
    }

}
