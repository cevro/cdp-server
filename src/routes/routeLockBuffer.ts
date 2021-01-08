import ServiceSignal from 'app/schema/services/serviceSignal';
import ServiceSector from 'app/schema/services/serviceSector';
import ModelSector from 'app/schema/models/modelSector';
import ModelTurnout from 'app/schema/models/modelTurnout';
import ServiceTurnout from 'app/schema/services/serviceTurnout';
import { BackendTurnout } from 'app/consts/interfaces/turnout';
import { EventsConnector } from 'app/glogalEvents/eventCollector';
import ServiceRoute from 'app/schema/services/serviceRoute';
import ModelRoute from 'app/schema/models/modelRoute';
import { BackendRouteLock } from 'app/consts/interfaces/routeLock';

export interface RouteLock {
    route: ModelRoute;
    buildOptions: BackendRouteLock.BuildOptions;
}

export default class RouteLockBuffer extends EventsConnector {

    private readonly serviceRoute: ServiceRoute;
    private readonly serviceSignal: ServiceSignal;
    private readonly serviceSector: ServiceSector;
    private readonly serviceTurnout: ServiceTurnout;

    private locked: boolean = false;

    private buffer: RouteLock[] = [];

    private strategy: 'fifo' | 'lifo' | 'any' = 'fifo';

    constructor(
        serviceRoute: ServiceRoute,
        serviceSignal: ServiceSignal,
        serviceSector: ServiceSector,
        serviceTurnout: ServiceTurnout,
    ) {
        super();
        this.serviceRoute = serviceRoute;
        this.serviceSignal = serviceSignal;
        this.serviceSector = serviceSector;
        this.serviceTurnout = serviceTurnout;
    }

    public addLock(lock: RouteLock): void {
        this.buffer.push(lock);
        this.getContainer().emit('@route-buffer/add-lock', lock);
    }

    public refresh(): void {
        if (this.locked) {
            return;
        }
        this.locked = true;
        for (const lock of this.findAvailableRoutes()) {
            if (lock.route.tryBuild(lock.buildOptions)) {
                return;
            }
            // take back to buffer
        }
        this.locked = false;
    }

    private findAvailableRoutes(): RouteLock[] {
        switch (this.strategy) {
            case 'any':
                return this.buffer;
            case 'fifo':
                return [this.buffer.shift()];
            case 'lifo':
                return [this.buffer.pop()];
        }
    }

    private isBuilding(): boolean {
        return this.buffer.some((route) => {
            return route.state === 'building';
        });
    }

    private handleChange(routeLock: RouteLock, route: ModelRoute) {

        if (this.checkSectors(route, true, false)) {
            //  this.changeAspect(route, AspectStrategy.calculate(route));
        } else {
            //  this.changeAspect(route, Aspect.STOP);
            for (const index in route.sectors) {
                if (+index < routeLock.sectorIndex) {
                    continue;
                }
                const sector = route.sectors[index];
                // if (sector.state !== 'locked') {
                //     this.sectorIndex = +index;
                //  }
            }
            if (routeLock.sectorIndex + 1 === route.sectors.length) {

            }
        }
        return;
    }

    private getSectors(route: ModelRoute): ModelSector[] {
        return route.sectors;
    }

    private getTurnoutPositions(route: ModelRoute): Array<{ turnout: ModelTurnout, position: BackendTurnout.EndPosition }> {
        return route.turnoutPositions;
    }

    private checkSectors(route: ModelRoute, locked: boolean, occupied: boolean): boolean {
        return this.getSectors(route).every((sector) => {
            return (sector.getLocked() === locked) && sector.getOccupied() === occupied;
        });
    }

    private checkTurnouts(route: ModelRoute, locked: boolean, checkPosition: boolean): boolean {
        return this.getTurnoutPositions(route).every(({turnout, position}) => {
            //  const lockedResults = turnout.isLocked() === locked;
            if (!checkPosition) {
                //     return lockedResults;
            }
            //  return lockedResults && (turnout.getCurrentPosition() === position);
        });
    }
}
