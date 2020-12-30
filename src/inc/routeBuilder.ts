import {
    TrainRouteBufferItem,
    TrainRouteDump,
} from '@definitions/interfaces';
import RouteLock from 'app/routeLock';
import { Aspects } from 'app/aspects';

class RouteBuilder /*extends LocoNetObject<TrainRouteDump> */ {

    private _locked: boolean = false;

    private buffer: RouteLock[] = [];

    private hasError: boolean;

    public constructor() {
        //   super(0, 'route-builder');
    }

    public async addToBuffer(trainRouteId: number, buildOptions: any): Promise<void> {
        const routeLock = new RouteLock(trainRouteId, buildOptions);
        this.buffer.push(routeLock);
        this.printBuffer();
        await this.tryBuild();
    }

    public printBuffer(): void {
        /*  logger.log({
              id: 0,
              date: new Date(),
              action: MESSAGE_ACTION_DUMP,
              entity: this.LOGGER_ENTITY,
              data: this.dumpBuffer(),
          });*/
    }

    public refreshRoutes() {
        for (let i = 0; i < this.buffer.length; i++) {
            this.buffer.forEach((locker) => {
                this.refreshRoute(locker);
            });
        }
    }

    public toObject(): TrainRouteDump {
        return this.dumpBuffer();
    }


    public destroyRoute(routeLock: RouteLock) {
        routeLock.destroyRoute();

        this.buffer = this.buffer.filter((bufferLock) => {
            return routeLock.getId() !== bufferLock.getId();
        });
        this.printBuffer();
    }

    public handleError(message: string) {
        this.hasError = true;
        console.log('route builder hadle error');
        this.refreshRoutes();
    }

    public dumpBuffer(): TrainRouteDump {
        return {
            buffer: this.buffer.map((routeLock): TrainRouteBufferItem => {
                return routeLock.dumpData();
            }),
            hasError: this.hasError,
            locked: this.locked,
        }
    }

    private get locked(): boolean {
        return this._locked;
    }

    private set locked(value: boolean) {
        this._locked = value;
        this.printBuffer();
    }

    private async build(routeLock: RouteLock) {
        if (this.hasError) {
            return;
        }
        await routeLock.build(this);
    }

    private async tryBuild(): Promise<void> {
        if (this.hasError || this.locked) {
            return;
        }

        const routeLock = this.findFirstNotBuiltRoute();
        if (!routeLock) {
            return;
        }

        this.locked = true;

        if (!routeLock.check()) {
            this.locked = false;
            return;
        }

        await this.build(routeLock);

        this.locked = false;

        this.refreshRoutes();
        await this.tryBuild();
    }

    private findFirstNotBuiltRoute(): RouteLock {
        const routes = this.buffer.filter((lock) => {
            return lock.state === RouteLock.STATE_WAITING;
        });
        if (routes.length) {
            return routes[0];
        }
        return null;
    }

    private refreshRoute(routeLock: RouteLock) {
        if (routeLock.state !== RouteLock.STATE_BUILT) {
            return;
        }
        const trainRoute = routeLock.route;
        if (this.hasError) {
            trainRoute.startSignal.requestChange(Aspects.ASPECT_STOP);
            return;
        }

        const sectors = routeLock.route.getSectors();

        let isFree = true;
        for (const id in sectors) {
            const sector = sectors[id];
            // isFree = isFree && sector.isFreeAndAllocated(routeLock.getId());
        }
        if (isFree) {
            routeLock.refresh();
            routeLock.route.recalculateSignal(routeLock);
            return;
        } else {
            routeLock.route.startSignal.requestChange(Aspects.ASPECT_STOP);

            let busyIndex = 0;
            for (const index in sectors) {
                const sector = sectors[index];
                /* if (sector.isFreeAndAllocated(locker.getId())) {
                     this.handleError('');
                 }*/
                // if (sector.state === STATUS_BUSY) {
                // posledný sektor znamená zhodenie VC
                //  if (sector.getLocoNetId() === trainRoute.endSector.getLocoNetId()) {
                //    this.destroyRoute(locker);
                // }
                // busyIndex = +index;
                // break;
                //  }

            }
            /*
            for (let i = 0; i < busyIndex; i++) {
                if (sectors[i].locked == locker.getId()) {
                    console.log('Error');
                    return;
                }
            }*/
            const unalockIndex = busyIndex - 1;
            if (sectors.hasOwnProperty(unalockIndex)) {
                //  if (sectors[unalockIndex].locked === routeLock.getId()) {
                routeLock.route.turnoutPositions.forEach((pointPosition) => {
                    // pointPosition.unlockBySector(locker.getId(), sectors[unalockIndex].getLocoNetId());
                });
                // sectors[unalockIndex].unlock(routeLock.getId());
            }
            // }
        }

    }

}

export const routeBuilder = new RouteBuilder();
