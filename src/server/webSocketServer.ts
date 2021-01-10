import { connection, server } from 'websocket';
import { BackendStore } from '@definitions/messages';
import * as http from 'http';
import { config } from 'app/config.local';
import { EventsConnector } from 'app/glogalEvents/eventCollector';
import ServiceSignal from 'app/schema/services/serviceSignal';
import ServiceSector from 'app/schema/services/serviceSector';
import ServiceTurnout from 'app/schema/services/serviceTurnout';
import { Actions } from 'app/actions';
import ModelSignal from 'app/schema/models/modelSignal';
import ModelTurnout from 'app/schema/models/modelTurnout';
import ModelSector from 'app/schema/models/modelSector';

export class WebSocketServer extends EventsConnector {

    private readonly wsServer: server;

    private readonly serviceSignal: ServiceSignal;
    private readonly serviceSector: ServiceSector;
    private readonly serviceTurnout: ServiceTurnout;

    public constructor(
        serviceSignal: ServiceSignal,
        serviceSector: ServiceSector,
        serviceTurnout: ServiceTurnout,
    ) {
        super();
        this.serviceSignal = serviceSignal;
        this.serviceSector = serviceSector;
        this.serviceTurnout = serviceTurnout;

        const httpServer = http.createServer((request, response) => {
            // console.log((new Date()) + ' Received request for ' + request.url);
            response.writeHead(404);
            response.end();
        });

        httpServer.listen(config.websocketServer.port, () => {
            console.log(' WS server is listening on port ' + config.websocketServer.port);
        });
        this.wsServer = new server({
            httpServer: httpServer,
            autoAcceptConnections: false,
        });
        this.registerListeners();
    }

    public run() {
        this.wsServer.on('request', (request) => {
            const connection = request.accept('echo-protocol', request.origin);
            this.initLog(connection);
        });
    }

    private registerListeners(): void {
        Actions.getAll().forEach((event) => {
            this.getContainer().on(event, (...args: any[]) => {
                console.log(event);
                const data = this.mapEventToMessage(event, ...args);
                this.wsServer.broadcast(JSON.stringify({store: data}));
            });
        });
    }

    private initLog(connection: connection): void {
        connection.send(JSON.stringify({
            store: {
                signals: this.serviceSignal.serialise(),
                sectors: this.serviceSector.serialise(),
                turnouts: this.serviceTurnout.serialise(),
                routeBuilder: {buffer: []},
            },
        }));
    }

    private mapEventToMessage(event: string, ...args: any[]): BackendStore {
        switch (event) {
            case Actions.Signal.ASPECT_REQUESTED:
            case Actions.Signal.ASPECT_CHANGED:
            case Actions.Signal.MODEL_CREATED:
                const signal: ModelSignal = args[0];
                return {
                    signals: {
                        [signal.getUId()]: signal.toArray(),
                    },
                };
            case Actions.Turnout.MODEL_CREATED:
            case Actions.Turnout.POSITION_REQUESTED:
            case Actions.Turnout.POSITION_CHANGED:
                const turnout: ModelTurnout = args[0];
                return {
                    turnouts: {
                        [turnout.getUId()]: turnout.toArray(),
                    },
                };
            case Actions.Sector.MODEL_CREATED:
            case Actions.Sector.LOCKED_CHANGED:
            case Actions.Sector.OCCUPIED_CHANGED:
                const sector: ModelSector = args[0];
                return {
                    sectors: {
                        [sector.getUId()]: sector.toArray(),
                    },
                };
        }
        return {};
    }
}
