import { server } from 'websocket';
import { WebSocketStateUpdateMessage } from '@definitions/messages';
import * as http from 'http';
import { config } from 'app/config.local';
import { EventsConnector } from 'app/glogalEvents/eventCollector';
import ServiceSignal from 'app/schema/services/serviceSignal';
import ServiceSector from 'app/schema/services/serviceSector';
import ServiceTurnout from 'app/schema/services/serviceTurnout';

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
            connection.send(JSON.stringify(this.mapStateToMessage()));
            this.logChange();
        });
    }

    private registerListeners(): void {
        const events = ['@signal/model-created', '@signal/aspect-changed', '@signal/aspect-requested'];
        events.forEach((event) => {
            this.getContainer().on(event, () => {
                console.log(event);
                this.logChange();
            });
        });
    }

    private logChange(): void {
        if (this.wsServer) {
            this.wsServer.broadcast(JSON.stringify(this.mapStateToMessage()));
        }
    }

    private mapStateToMessage(): WebSocketStateUpdateMessage {
        return {
            store: {
                signals: this.serviceSignal.getAll(),
            },
        };
    }
}
