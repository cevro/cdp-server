import ModelRoute from 'app/schema/models/modelRoute';
import AspectStrategy from 'app/routes/aspectStrategy';
import { BackendRouteLock } from 'app/consts/interfaces/routeLock';
import { BackendSector } from 'app/consts/interfaces/sector';
import { Aspect } from 'app/consts/interfaces/signal';
import ReduxConnector from 'app/reduxConnector';

export class RouteLock extends ReduxConnector<any, any> {

    public readonly buildOptions: BackendRouteLock.BuildOptions;
    public readonly lockUId: string;
    private state: BackendRouteLock.State = 'waiting';
    private readonly route: ModelRoute;

    private reason: string;

    private sectorIndex = -1;

    constructor(route: ModelRoute, buildOptions: BackendRouteLock.BuildOptions) {
        super();
        this.route = route;
        this.lockUId = route.getUId() + '-' + (new Date()).getTime();
        this.buildOptions = buildOptions;
        this.registerListeners();
    }

    public getRoute(): ModelRoute {
        return this.route;
    }

    public check(): boolean {
        if (!this.sectorsCheck('free')) {
            return false;
        }
        try {
            const pointPositions = this.route.turnoutPositions;
            for (const id in this.route.turnoutPositions) {
                const pointPosition = pointPositions[id];
                //  pointPosition.check();
            }
            // const knot = route.knot;
            // if (knot) {
            //    knot.check();
            //  }
        } catch (e) {
            console.log('try build reason:' + e.message);
            this.reason = e.message;
            return false;
        }
        return true;
    }


    public async build(): Promise<void> {
        if (!this.check()) {
            return;
        }

        this.setState('building');

        for (const {turnout, position} of this.route.turnoutPositions) {
            await turnout.requestChange(position);
        }
        for (const sector of this.route.sectors) {
            sector.setState('locked');
        }

        this.route.startSignal.requestChange(AspectStrategy.calculate(this));

        this.setState('built');
    }

    public destroyRoute(): void {
        const pointPositions = this.route.turnoutPositions;
        for (const id in pointPositions) {
            const pointPosition = pointPositions[id];
            // pointPosition.unlock(this.getId());
        }
        const sectors = this.route.sectors;
        for (const id in sectors) {
            //    sectors[id].unlock(this.getId());
        }
    }

    public toArray(): BackendRouteLock.Snapshot {
        return {
            buildOptions: this.buildOptions,
            state: this.state,
            routeUId: this.route.getUId(),
            lockUId: this.lockUId,
            reason: this.reason,
        };
    }

    public getState(): BackendRouteLock.State {
        return this.state;
    }

    protected reduxPropsChanged() {
        super.reduxPropsChanged();
        this.handleChange();
    }

    private setState(state: BackendRouteLock.State): void {
        this.state = state;
    }

    private handleChange() {
        if (this.state !== 'built') {
            return;
        }

        if (this.sectorsCheck('locked')) {
            this.route.startSignal.requestChange(AspectStrategy.calculate(this));
        } else {
            this.route.startSignal.requestChange(Aspect.STOP);
            for (const index in this.route.sectors) {
                if (+index < this.sectorIndex) {
                    continue;
                }
                const sector = this.route.sectors[index];
                if (sector.state !== 'locked') {
                    this.sectorIndex = +index;
                }
            }
            if (this.sectorIndex + 1 === this.route.sectors.length) {

            }
        }
        return;
    }

    private registerListeners(): void {
    }

    private sectorsCheck(state: BackendSector.States): boolean {
        return this.route.sectors.every((sector) => {
            return sector.state === state;
        });
    }
}
