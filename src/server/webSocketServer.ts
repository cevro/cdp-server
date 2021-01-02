import {
    connection,
    server,
} from 'websocket';
import { WebSocketStateUpdateMessage } from '@definitions/messages';
import * as http from 'http';
import { config } from 'app/config.local';
import { Action, CombinedState, Dispatch } from 'redux';
import { AppStore } from 'app/reducers';
import ReduxConnector from 'app/reduxConnector';

export class WebSocketServer extends ReduxConnector<AppStore, void> {
    private wsServer: server;
    private initialCallback: (connection: connection) => void;

    constructor() {
        super();
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

    public logChange(message: WebSocketStateUpdateMessage): void {
        if (this.wsServer) {
            this.wsServer.broadcast(JSON.stringify(message));
        }

    }

    protected reduxPropsChanged() {
        super.reduxPropsChanged();
        this.logChange(this.mapStateToMessage());
    }


    public mapState(store: CombinedState<AppStore>) {
        return store;
    }

    public mapDispatch(dispatch: Dispatch<Action<string>>) {

    }

    private mapStateToMessage(): WebSocketStateUpdateMessage {
        return {
            state: {
                signals: {
                    ...this.reduxProps.state.signals,
                },
            },
        };
    }
}
