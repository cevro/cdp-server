import ReduxConnector from 'app/reduxConnector';
import { AppStore } from 'app/reducers';
import { CombinedState, Dispatch, Action } from 'redux';
import AspectStrategy from 'app/routes/aspectStrategy';
import { Aspect } from 'app/consts/interfaces/signal';
import { RouteBuilderActions } from 'app/actions/routeBuilder';
import changeLockState = RouteBuilderActions.changeLockState;
import { BackendRouteLock } from 'app/consts/interfaces/routeLock';
import RouteService from 'app/schema/services/routeService';
import { RouteLock } from 'app/reducers/routeBuilder';

export default class RouteBuilder extends ReduxConnector<{
    buffer: RouteLock[];
}, {
    onChangeLockState(lockUId: string, state: BackendRouteLock.State): void
}> {

    private routeService: RouteService;
    private locked: boolean = false;

    constructor(routeService: RouteService) {
        super();
        this.routeService = routeService;
        this.connect();
    }

    public reduxPropsDidUpdated() {
        super.reduxPropsDidUpdated();
        this.refresh();
    }

    protected mapState(state: CombinedState<AppStore>) {
        return {
            buffer: state.routeBuilder.buffer,
        };
    }

    protected mapDispatch(dispatch: Dispatch<Action<string>>) {
        return {
            onChangeLockState: (lockUId: string, state: BackendRouteLock.State) => dispatch(changeLockState(lockUId, state)),
        };
    }

    public refresh(): void {
        if (this.locked) {
            return;
        }
        this.locked = true;
        for (const lock of this.reduxProps.state.buffer) {
            switch (lock.state) {
                case 'building':
                    this.handleFinishBuild(lock);
                    break;
                case 'built':
                    this.handleChange(lock);
                    break;
                case 'waiting':
                    this.handleTryBuild(lock);
                    break;
            }
        }
        this.locked = false;
    }

    public destroyRoute(routeLock: RouteLock): void {
        const route = this.routeService.findByUId(routeLock.routeUId);
        const pointPositions = route.turnoutPositions;
        for (const id in pointPositions) {
            const pointPosition = pointPositions[id];
            // pointPosition.unlock(this.getId());
        }
        for (const id in route.sectorsUIds) {
            //    sectors[id].unlock(this.getId());
        }
    }

    private handleFinishBuild(routeLock: RouteLock): void {
        /*  if (!routeLock.route.checkSectors('locked')) {
              return;
          }*/
        const route = this.routeService.findByUId(routeLock.routeUId);

        if (!route.checkTurnouts()) {
            return;
        }

        route.changeAspect(
            AspectStrategy.calculate(
                routeLock.buildOptions,
                route,
            ),
        );
        this.reduxProps.dispatch.onChangeLockState(routeLock.lockUId, 'built');
    }

    /*  private handleChange(routeLock: RouteLock): void {

      }*/

    private handleTryBuild(routeLock: RouteLock): void {
        if (this.isBuilding()) {
            return;
        }
        const route = this.routeService.findByUId(routeLock.routeUId);
        /*   if (!this.check()) {
               return;
           }*/
        this.reduxProps.dispatch.onChangeLockState(routeLock.lockUId, 'building');
        route.switchTurnouts();
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

    private handleChange(routeLock: RouteLock) {
        const route = this.routeService.findByUId(routeLock.routeUId);

        // if (route.checkSectors('locked')) {
        route.changeAspect(AspectStrategy.calculate(routeLock.buildOptions, route));
        /* } else {
             route.changeAspect(Aspect.STOP);
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
         }*/
        return;
    }
}
