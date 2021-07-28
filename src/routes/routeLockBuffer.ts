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

    private buffer: RouteLock[] = [];

    constructor(
        serviceRoute: ServiceRoute,
    ) {
        super();
        this.serviceRoute = serviceRoute;
        this.getContainer().on('@route-buffer/add-lock', (routeId: string, buildOptions: BuildOptions) => {
            const route = this.serviceRoute.findByUId(routeId);
            const lock = {
                route,
                buildOptions,
            };
            this.addLock(lock);
        });
    }

    public addLock(lock: RouteLock): void {
        this.buffer.push(lock);
    }

    public getBuffer(): RouteLock[] {
        return this.buffer;
    }
}
