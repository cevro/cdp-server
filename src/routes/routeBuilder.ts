import ReduxConnector from 'app/reduxConnector';
import { AppStore } from 'app/reducers';
import { CombinedState, Dispatch, Action } from 'redux';
import { RouteBuilderActions } from 'app/actions/routeBuilder';
import { BackendRouteLock } from 'app/consts/interfaces/routeLock';
import { RouteLock } from 'app/reducers/routeBuilder';
import RouteService from 'app/routes/routeService';
import SignalService from 'app/schema/services/signalService';
import AspectStrategy from 'app/routes/aspectStrategy';
import ModelRoute from 'app/routes/modelRoute';
import ModelSignal from 'app/schema/models/modelSignal';
import { Aspect } from 'app/consts/interfaces/signal';
import SectorService from 'app/schema/services/sectorService';
import ModelSector from 'app/schema/models/modelSector';
import ModelTurnout from 'app/schema/models/modelTurnout';
import TurnoutService from 'app/schema/services/turnoutService';
import { BackendTurnout } from 'app/consts/interfaces/turnout';

export default class RouteBuilder extends ReduxConnector<{
    buffer: RouteLock[];
}, {
    onChangeLockState(lockUId: string, state: BackendRouteLock.State): void
}> {

    private readonly routeService: RouteService;
    private readonly signalService: SignalService;
    private readonly sectorService: SectorService;
    private readonly turnoutService: TurnoutService;

    private locked: boolean = false;

    constructor(
        routeService: RouteService,
        signalService: SignalService,
        sectorService: SectorService,
        turnoutService: TurnoutService,
    ) {
        super();
        this.routeService = routeService;
        this.signalService = signalService;
        this.sectorService = sectorService;
        this.turnoutService = turnoutService;
        this.connect();
    }

    public reduxPropsDidUpdated(oldProps) {
        super.reduxPropsDidUpdated(oldProps);
        this.refresh();
    }

    protected mapState(state: CombinedState<AppStore>) {
        return {
            buffer: state.routeBuilder.buffer,
        };
    }

    protected mapDispatch(dispatch: Dispatch<Action<string>>) {
        return {
            onChangeLockState: (
                lockUId: string,
                state: BackendRouteLock.State,
            ) => dispatch(RouteBuilderActions.changeLockState(lockUId, state)),
        };
    }

    public refresh(): void {
        if (this.locked) {
            return;
        }
        this.locked = true;
        for (const lock of this.reduxProps.state.buffer) {
            const route = this.routeService.findByUId(lock.routeUId);
            switch (lock.state) {
                case 'building':
                    this.handleFinishBuild(lock, route);
                    break;
                case 'built':
                    this.handleChange(lock, route);
                    break;
                case 'waiting':
                    this.handleTryBuild(lock, route);
                    break;
            }
        }
        this.locked = false;
    }

    public destroyRoute(routeLock: RouteLock, route: ModelRoute): void {
        const pointPositions = route.turnoutPositions;
        for (const id in pointPositions) {
            const pointPosition = pointPositions[id];
            // pointPosition.unlock(this.getId());
        }
        for (const id in route.sectorsUIds) {
            //    sectors[id].unlock(this.getId());
        }
    }

    private handleFinishBuild(routeLock: RouteLock, route: ModelRoute): void {
        /* if (!routeLock.route.checkSectors('locked')) {
             return;
         }*/
        /* if (!route.checkTurnouts()) {
             return;
         }*/
        const newAspect = AspectStrategy.calculate(
            routeLock.buildOptions,
            route,
            this.getEndSignal(route),
        );
        this.changeAspect(route, newAspect);
        /*   route.changeAspect(

           );*/
        this.reduxProps.dispatch.onChangeLockState(routeLock.lockUId, 'built');
    }

    /*  private handleChange(routeLock: RouteLock): void {

      }*/

    private handleTryBuild(routeLock: RouteLock, route: ModelRoute): void {
        if (this.isBuilding()) {
            console.log('fail building');
            return;
        }
        if (!this.checkSectors(route, false, false)) {
            console.log('fail sector');
            return;
        }
        if (!this.checkTurnouts(route, false, false)) {
            console.log('fail turnouts');
            return;
        }
        this.reduxProps.dispatch.onChangeLockState(routeLock.lockUId, 'building');
        // route.switchTurnouts();
    }

    private findFirstNotBuiltRoute(): RouteLock {
        const routes = this.reduxProps.state.buffer.filter((lock) => {
            return lock.state === 'waiting';
        });
        if (routes.length) {
            return routes[0];
        }
        return null;
    }

    private isBuilding(): boolean {
        return this.reduxProps.state.buffer.some((route) => {
            return route.state === 'building';
        });
    }

    private handleChange(routeLock: RouteLock, route: ModelRoute) {

        if (this.checkSectors(route, true, false)) {
            this.changeAspect(route, AspectStrategy.calculate(
                routeLock.buildOptions,
                route,
                this.getEndSignal(route),
            ));
        } else {
            this.changeAspect(route, Aspect.STOP);
            for (const index in route.sectorsUIds) {
                if (+index < routeLock.sectorIndex) {
                    continue;
                }
                const sector = route.sectorsUIds[index];
                // if (sector.state !== 'locked') {
                //     this.sectorIndex = +index;
                //  }
            }
            if (routeLock.sectorIndex + 1 === route.sectorsUIds.length) {

            }
        }
        return;
    }

    private getEndSignal(route: ModelRoute): ModelSignal | null {
        return route.endSignalUId ? this.signalService.findByUId(route.endSignalUId) : null;
    }

    private getStartSignal(route: ModelRoute): ModelSignal {
        return route.startSignalUId ? this.signalService.findByUId(route.startSignalUId) : null;
    }

    private changeAspect(route: ModelRoute, aspect: number): void {
        const model = this.getStartSignal(route);
        if (model.getDisplayedAspect() !== aspect) {
            this.signalService.handleRequestChange(model, aspect);
        }
    }

    private getSectors(route: ModelRoute): ModelSector[] {
        return route.sectorsUIds
            .map((sectorUId) => {
                return this.sectorService.findByUId(sectorUId);
            });
    }

    private getTurnoutPositions(route: ModelRoute): Array<{ turnout: ModelTurnout, position: BackendTurnout.EndPosition }> {
        return route.turnoutPositions
            .map(({turnoutUId, position}) => {
                return {
                    turnout: this.turnoutService.findByUId(turnoutUId),
                    position: position,
                };
            });
    }

    private checkSectors(route: ModelRoute, locked: boolean, occupied: boolean): boolean {
        return this.getSectors(route).every((sector) => {
            return (sector.getLocked() === locked) && sector.getOccupied() === occupied;
        });
    }

    private checkTurnouts(route: ModelRoute, locked: boolean, checkPosition: boolean): boolean {
        return this.getTurnoutPositions(route).every(({turnout, position}) => {
            const lockedResults = turnout.isLocked() === locked;
            if (!checkPosition) {
                return lockedResults;
            }
            return lockedResults && (turnout.getCurrentPosition() === position);
        });
    }
}
