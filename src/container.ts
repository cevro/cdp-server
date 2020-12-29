import SignalService from 'app/schema/services/signalService';
import TurnoutService from 'app/schema/services/turnoutService';
import { Connection } from 'mysql';
import * as mysql from 'mysql';
import { config } from 'app/config.local';
import { WebSocketServer } from 'app/server/webSocketServer';
import AbstractService from 'app/schema/services/abstractService';
import RestServer from 'app/server/restServer';
import { WebSocketStateUpdateMessage } from 'app/consts/messages';
import { connection } from 'websocket';

export default class Container {
    private signalService: SignalService = null;

    private turnoutService: TurnoutService = null;
    private schemaConnection: mysql.Connection = null;

    private webSocketServer: WebSocketServer = null;
    private restServer: RestServer = null;

    public async getSignalService(): Promise<SignalService> {
        if (!this.signalService) {
            this.signalService = new SignalService();
            await this.registerEntityService(this.signalService);
        }
        return this.signalService;
    }

    public async getTurnoutService(): Promise<TurnoutService> {
        if (!this.turnoutService) {
            this.turnoutService = new TurnoutService();
            await this.registerEntityService(this.turnoutService);
        }
        return this.turnoutService;
    }

    public getSchemaConnection(): Connection {
        if (!this.schemaConnection) {
            this.schemaConnection = mysql.createConnection(config.schemaDatabase);
        }
        return this.schemaConnection;
    }

    public async getWebSocketServer(): Promise<WebSocketServer> {
        if (!this.webSocketServer) {
            this.webSocketServer = new WebSocketServer();
            const services = [await this.getTurnoutService(), await this.getSignalService()];
            this.webSocketServer.setInitialCallBack((connection: connection) => {
                    const data = {};
                    for (const service of services) {
                        service.getAll().forEach((model) => {
                            data[model.entityName] = data[model.entityName] || [];
                            data[model.entityName].push(model.toArray());
                        });
                    }
                    const message: WebSocketStateUpdateMessage = {
                        data,
                    };
                    connection.send(JSON.stringify(message));
                },
            );
        }
        return this.webSocketServer;
    }

    private async registerEntityService(service: AbstractService<any>) {
        await service.loadSchema(this.getSchemaConnection());
        const webSocketServer = await this.getWebSocketServer();
        service.getAll().forEach((model) => {
            model.on('change', () => {
                webSocketServer.logChange({
                    data: {
                        [model.entityName]: [model.toArray()],
                    },
                });
            });
        });
    }
}
