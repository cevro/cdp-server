import { TrainRouteBufferItem } from '@definitions/interfaces';
import { routesFactory } from 'app/inc/RoutesFactory';
import Route from 'app/schema/models/route';
import AspectStrategy from 'app/aspectStrategy';

export default class RouteLock {

    public static readonly STATE_WAITING = 'waiting';
    public static readonly STATE_BUILDING = 'building';
    public static readonly STATE_BUILT = 'built';
    public readonly buildOptions: any;
    public reason: string;

    public readonly route: Route;

    private readonly id: number;
    private _state: string;

    constructor(routeId: number, buildOptions: any) {
        this.route = routesFactory.findById(routeId);
        this.id = (new Date()).getTime();
        this.state = RouteLock.STATE_WAITING;
        this.buildOptions = buildOptions;
        /*  logger.log({
              date: new Date(),
              action: 'create',
              entity: 'locker',
              id: this.id,
              data: null,
          });*/
    }

    public get state(): string {
        return this._state;
    }

    public sendState() {
        /*   logger.log({
               action: MESSAGE_ACTION_STATE_UPDATE,
               entity: 'locker',
               data: this.dumpData(),
               id: this.id,
               date: new Date(),
           });*/
    }

    public set state(value: string) {
        // this.sendState();
        this._state = value;
    }

    public getId(): number {
        return this.id;
    }

    public dumpData(): TrainRouteBufferItem {
        return {
            id: this.getId(),
            state: this.state,
            name: this.route.name,
            reason: this.reason,
            buildOptions: this.buildOptions,
        };
    }

    public check(): boolean {
        const route = this.route;
        try {
            const pointPositions = route.turnoutPositions;
            for (const id in route.turnoutPositions) {
                const pointPosition = pointPositions[id];
                //  pointPosition.check();
            }
            const sectors = route.getSectors();
            for (const id in sectors) {
                const sector = sectors[id];
                sector.check();
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

    public async build(routeBuilder: any) {

        const trainRoute = this.route;
        this.state = RouteLock.STATE_BUILDING;
        routeBuilder.printBuffer();
        try {
            const pointPositions = trainRoute.turnoutPositions;
            for (const id in pointPositions) {
                const pointPosition = pointPositions[id];
                // await pointPosition.lock(this.getId());
            }

            const sectors = trainRoute.getSectors();
            for (const id in sectors) {
                const sector = sectors[id];
                sector.lock(this.getId());
            }
            trainRoute.startSignal.requestChange(AspectStrategy.calculate(this));

            this.state = RouteLock.STATE_BUILT;
            routeBuilder.printBuffer();
        } catch (e) {
            await this.rollBack();
        }
    }

    public refresh() {
        this.route.startSignal.requestChange(AspectStrategy.calculate(this));
    }

    public async rollBack() {
    }

    public destroyRoute(): void {
        const pointPositions = this.route.turnoutPositions;
        for (const id in pointPositions) {
            const pointPosition = pointPositions[id];
            // pointPosition.unlock(this.getId());
        }
        const sectors = this.route.getSectors();
        for (const id in sectors) {
            sectors[id].unlock(this.getId());
        }
    }
}
