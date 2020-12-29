import {
    connection,
    server,
} from 'websocket';
import { Message, WebSocketStateUpdateMessage } from '@definitions/messages';
import * as http from 'http';
import { ENTITY_AB_SECTOR, ENTITY_BI_DIR_AB, ENTITY_SECTOR, ENTITY_SIGNAL, ENTITY_TURNOUT } from '@definitions/entity';
import { signalService } from 'app/schema/services/signalService';

const httpServer = http.createServer((request, response) => {
    // console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});

httpServer.listen(8081, () => {
    // console.log((new Date()) + ' Server is listening on port 8081');
});
const initClient = (connection: connection) => {
    const message: WebSocketStateUpdateMessage = {
        data: {
            [ENTITY_SIGNAL]: signalService.signals.map((signal) => {
                return signal.toArray();
            }),
            // [ENTITY_SECTOR]: sectorFactory.dump(),
            // [ENTITY_TURNOUT]: turnoutsService.dump(),
            // routeBuilder: routeBuilder.dumpBuffer(),
            // [ENTITY_AB_SECTOR]: autoBlockSectorFactory.dump(),
            // [ENTITY_BI_DIR_AB]: biDirAutoBlockFactory.dump(),
        },
    };
    connection.send(JSON.stringify(message));
};

export const webSocketServer = new class {
    private wsServer: server;

    public run() {
        this.wsServer = new server({
            httpServer: httpServer,
            autoAcceptConnections: false,
        });
        this.wsServer.on('request', (request) => {
            const connection = request.accept('echo-protocol', request.origin);
            initClient(connection);
        });
    }

    public log<T extends Message>(message: T) {
        this.wsServer.broadcast(JSON.stringify(message));
    }

    public logChange(message: WebSocketStateUpdateMessage): void {
        this.wsServer.broadcast(JSON.stringify(message));
    }
};

