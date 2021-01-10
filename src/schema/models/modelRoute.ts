import { BackendTurnout } from 'app/consts/interfaces/turnout';
import ModelSignal from 'app/schema/models/modelSignal';
import ModelSector from 'app/schema/models/modelSector';
import { BackendRouteLock } from 'app/consts/interfaces/routeLock';
import AspectStrategy from 'app/routes/aspectStrategy';
import ModelTurnout from 'app/schema/models/modelTurnout';
import AbstractModel from 'app/schema/models/abstractModel';
import { TrainRouteDefinition } from 'app/schema/services/serviceRoute';
import ModelTrackApproval from 'app/schema/models/tractApproval/modelTrackApproval';

export interface TurnoutPosition {
    turnout: ModelTurnout;
    position: BackendTurnout.EndPosition;
}

export interface ApprovalPosition {
    approval: ModelTrackApproval;
    position: 'F' | 'R';
}

type States = 'building' | 'built' | 'idle';
export default class ModelRoute extends AbstractModel {
    public readonly name: string;
    public readonly speed: BackendRoute.Speed;
    public readonly sufficientDistance: boolean;

    public readonly startSignal: ModelSignal;
    public readonly endSignal: ModelSignal | null;

    public readonly sectors: ModelSector[];
    public readonly turnoutPositions: TurnoutPosition[];
    public readonly trackApproval: ApprovalPosition | null;
    public readonly routeUId: string;
    public _state: States = 'idle';
    public buildOptions: BackendRouteLock.BuildOptions | null;

    constructor(
        row: BackendRoute.Row,
        def: TrainRouteDefinition,
        startSignal: ModelSignal,
        endSignal: ModelSignal | null,
        turnoutPositions: TurnoutPosition[],
        sectors: ModelSector[],
        trackApproval: ApprovalPosition | null,
    ) {
        super();
        this.routeUId = row.route_uid;
        this.name = row.name;
        this.speed = row.speed;
        this.sufficientDistance = row.sufficient_distance;

        this.endSignal = endSignal;
        this.startSignal = startSignal;
        this.sectors = sectors;
        this.trackApproval = trackApproval;
        this.turnoutPositions = turnoutPositions;
    }

    public get state(): States {
        return this._state;
    }

    public set state(state: States) {
        this._state = state;
        this.getContainer().emit('@route/state-changed');
    }

    public setBuildOptions(options: BackendRouteLock.BuildOptions) {
        this.buildOptions = options;
    }

    public getUId(): string {
        return this.routeUId;
    }

    public toArray(): {} {
        return {};
    }

    /*  private handleChange(routeLock: RouteLock): void {

      }*/

    public tryBuild(buildOptions: BackendRouteLock.BuildOptions): boolean {
        // first check all
        if (!this.checkSectors(false, false)) {
            console.log('fail sector');
            return;
        }
        if (!this.checkTurnouts(false, false)) {
            console.log('fail turnouts');
            return;
        }

        this.state = 'building';
        this.setBuildOptions(buildOptions);
        this.switchTurnouts();
        this.lockSectors();
    }

    private refresh(): void {
        switch (this.state) {
            case 'building':
                // this.handleFinishBuild();
                break;
            case 'built':
                // this.handleChange();
                break;
            case 'idle':
                return;
        }
    }

    private handleIdleToWaiting(route: ModelRoute): void {
        /* if (!routeLock.route.checkSectors('locked')) {
             return;
         }*/
        /* if (!route.checkTurnouts()) {
             return;
         }*/
        route.startSignal.displayedAspect = AspectStrategy.calculate(route);
        /*   route.changeAspect(

           );*/
    }

    private lockSectors(): void {
        this.sectors.forEach((sector) => {
            sector.locked = true;
        });
    }

    private switchTurnouts(): void {
        this.turnoutPositions.forEach((position) => {
            this.switchTurnout(position);
        });
    }

    private switchTurnout(position: TurnoutPosition): void {
        position.turnout.locked = true;
        position.turnout.requestedPosition = position.position;
    }

    private checkSectors(locked: boolean, occupied: boolean): boolean {
        return this.sectors.every((sector) => {
            return (sector.locked === locked) && sector.occupied === occupied;
        });
    }

    private checkTurnouts(locked: boolean, checkPosition: boolean): boolean {
        return this.turnoutPositions.every(({turnout, position}) => {
            const lockedResults = turnout.locked === locked;
            if (!checkPosition) {
                return lockedResults;
            }
            return lockedResults && (turnout.currentPosition === position);
        });
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

    export type Speed = '40' | null;
}
