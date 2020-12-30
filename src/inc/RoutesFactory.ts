import Route from 'app/schema/models/route';

class RoutesFactory/* implements HttpReceiver<Message>*/ {
    private readonly routes: Route[];

    constructor() {
        this.routes = []// /*routes*/[].map((def) => {
        // return new Route(def);
        //  });
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

    public findRoute(startSignalId: number, endSectorId: number): Route[] {
        return this.routes.filter((route) => {
            //   return (route.startSignal.getLocoNetId() === startSignalId) && (route.endSector.getLocoNetId() === endSectorId);
        });
    }

    public findById(id: number): Route {
        for (const i in this.routes) {
            if (id === this.routes[i].id) {
                return this.routes[i];
            }
        }
        return null;
    }

}

export const routesFactory = new RoutesFactory();
