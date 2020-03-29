import {
    connection,
    server,
} from 'websocket';
import {Message, METHOD_TYPE} from '@definitions/messages';
import {routeBuilder} from './inc/Factories/RouteBuilder';
import {turnoutsFactory} from './inc/Factories/TurnoutsFactory';
import {signalFactory} from './inc/Factories/SignalsFactory';
import {sectorFactory} from './inc/Factories/SectorsFactory';
import {HttpReceiver} from './inc/Factories/DateReceiver';
import {autoBlockSectorFactory} from './inc/Factories/ABSectorsFactory';
import {biDirAutoBlockFactory} from './inc/Factories/BiDirABsFactory';
import * as http from 'http';
import {ENTITY_AB_SECTOR, ENTITY_BI_DIR_AB, ENTITY_SECTOR, ENTITY_SIGNAL, ENTITY_TURNOUT} from "@definitions/entity";

const httpServer = http.createServer((request, response) => {
    // console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});

httpServer.listen(8081, () => {
    // console.log((new Date()) + ' Server is listening on port 8081');
});
const initClient = (connection: connection) => {
    const message: Message = {
        uri: '/',
        method: 'patch',
        data: {
            [ENTITY_SIGNAL]: signalFactory.dump(),
            [ENTITY_SECTOR]: sectorFactory.dump(),
            [ENTITY_TURNOUT]: turnoutsFactory.dump(),
            //routeBuilder: routeBuilder.dumpBuffer(),
            [ENTITY_AB_SECTOR]: autoBlockSectorFactory.dump(),
            [ENTITY_BI_DIR_AB]: biDirAutoBlockFactory.dump(),
        },
    };
    connection.send(JSON.stringify(message));
};

export const logger = new class {
    private wsServer: server;
    private dataReceivers: HttpReceiver<Message>[] = [
        //routesFactory,
      //  routeBuilder,
        turnoutsFactory,
        sectorFactory,
        autoBlockSectorFactory,
        biDirAutoBlockFactory,
        signalFactory,
    ];

    public run() {
        this.wsServer = new server({
            httpServer: httpServer,
            autoAcceptConnections: false,
        });
        this.wsServer.on('request', (request) => {

            const connection = request.accept('echo-protocol', request.origin);
            initClient(connection);

            connection.on('message', (message) => {
                if (message.type === 'utf8') {
                    const data: Message = JSON.parse(message.utf8Data);
                    this.dataReceivers.forEach((dataReceiver) => {
                        const methodName = this.formatHandleMethod(data.method);
                        if (typeof dataReceiver[methodName] === 'function') {
                            dataReceiver[methodName](data);
                        }
                    });
                }
            });
            connection.on('close', (reasonCode, description) => {
            });
        });
    }

    public formatHandleMethod(method: METHOD_TYPE): string {
        return 'handle' + method.charAt(0).toUpperCase() + method.slice(1);
    }

    public log<T extends Message>(message: T) {
        this.wsServer.broadcast(JSON.stringify(message));
        // console.log('[' + message.date.toISOString() + ']: ' + JSON.stringify(message));
    }
};
