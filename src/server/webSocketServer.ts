import {
    connection,
    server,
} from 'websocket';
import { Message, WebSocketStateUpdateMessage } from '@definitions/messages';
import * as http from 'http';

export class WebSocketServer {
    private wsServer: server;
    private initialCallback: (connection: connection) => void;

    constructor() {
        const httpServer = http.createServer((request, response) => {
            // console.log((new Date()) + ' Received request for ' + request.url);
            response.writeHead(404);
            response.end();
        });

        httpServer.listen(8081, () => {
            // console.log((new Date()) + ' Server is listening on port 8081');
        });
        this.wsServer = new server({
            httpServer: httpServer,
            autoAcceptConnections: false,
        });

    }

    public setInitialCallBack(callback: (connection: connection) => void) {
        this.initialCallback = callback;
    }

    public run() {
        this.wsServer.on('request', (request) => {
            const connection = request.accept('echo-protocol', request.origin);
            this.initialCallback(connection);
        });
    }

    public log<T extends Message>(message: T) {
        this.wsServer.broadcast(JSON.stringify(message));
    }

    public logChange(message: WebSocketStateUpdateMessage): void {
        this.wsServer.broadcast(JSON.stringify(message));
    }
}
