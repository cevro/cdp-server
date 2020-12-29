import TrainRoute from '../models/route';
import {Message} from '@definitions/messages';
import {RouteFinderRequest} from '@definitions/interfaces';

class RoutesFactory/* implements HttpReceiver<Message>*/ {
    private readonly routes: TrainRoute[];

    constructor() {
        this.routes = /*routes*/[].map((def) => {
            return new TrainRoute(def);
        });
    }
    /*
    public handleMessageReceive(message: Message): void {
        if (message.entity !== 'route-finder') {
            return;
        }
        switch (message.action) {
            case 'find':
                return this.handelFindRoute(message);
        }
    }*/

    public findRoute(startSignalId: number, endSectorId: number): TrainRoute[] {
        return this.routes.filter((route) => {
         //   return (route.startSignal.getLocoNetId() === startSignalId) && (route.endSector.getLocoNetId() === endSectorId);
        });
    }

    public findById(id: number): TrainRoute {
        for (const i in this.routes) {
            if (id === this.routes[i].id) {
                return this.routes[i];
            }
        }
        return null;
    }

    private handelFindRoute(message: Message<{ startSignalId: number, endSectorId: number }>): void {
        const data: RouteFinderRequest = message.data;
        const routes = this.findRoute(data.startSignalId, data.endSectorId);
     /*   logger.log({
            date: new Date(),
            id: 0,
            entity: 'route-finder',
            action: 'found',
            data: {routes},
        });*/
    }

}

export const routesFactory = new RoutesFactory();
