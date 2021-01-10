import ServiceSignal from 'app/schema/services/serviceSignal';
import ServiceSector from 'app/schema/services/serviceSector';
import ServiceTurnout from 'app/schema/services/serviceTurnout';
import { EventsConnector } from 'app/glogalEvents/eventCollector';
import ServiceRoute from 'app/schema/services/serviceRoute';
import ModelRoute from 'app/schema/models/modelRoute';
import { BackendRouteLock } from 'app/consts/interfaces/routeLock';
import BuildOptions = BackendRouteLock.BuildOptions;

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
        this.registerListeners();
    }

    public addLock(lock: RouteLock): void {
        this.buffer.push(lock);
        this.getContainer().emit('@route-buffer/added-lock', lock);
    }

    private registerListeners(): void {
        this.getContainer().on('@route-buffer/add-lock', (routeId: string, buildOptions: BuildOptions) => {
            const lock = this.createLock(routeId, buildOptions);
            this.addLock(lock);
        });
    }

    private createLock(routeId: string, buildOptions: BuildOptions): RouteLock {
        const route = this.serviceRoute.findByUId(routeId);
        return {
            route,
            buildOptions,
        };
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
}
