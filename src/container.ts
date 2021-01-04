import SignalService from 'app/schema/services/signalService';
import TurnoutService from 'app/schema/services/turnoutService';
import { Connection } from 'mysql';
import * as mysql from 'mysql';
import { config } from 'app/config.local';
import { WebSocketServer } from 'app/server/webSocketServer';
import AbstractService from 'app/schema/services/abstractService';
import RestServer from 'app/server/restServer';
import SectorService from 'app/schema/services/sectorService';
import Handler from 'app/server/handlers/handler';
import RouteBuilder from 'app/routes/routeBuilder';
import { CombinedState, createStore, Store } from 'redux';
import { app, AppStore } from 'app/reducers';
import RouteService from 'app/routes/routeService';
import SerialConnector from 'app/serialConnector';

class Container {

    private reduxStore: Store<CombinedState<AppStore>>;

    private signalService: SignalService;
    private turnoutService: TurnoutService;
    private sectorService: SectorService;
    private routeService: RouteService;
    private serialConnector: SerialConnector;

    private routeBuilder: RouteBuilder;

    private schemaConnection: mysql.Connection;

    private webSocketServer: WebSocketServer;
    private restServer: RestServer;

    public async getRouteBuilder(): Promise<RouteBuilder> {
        if (!this.routeBuilder) {
            this.routeBuilder = new RouteBuilder(
                (await this.getRouteService()),
                (await this.getSignalService()),
                (await this.getSectorService()),
                (await this.getTurnoutService()),
            );
        }
        return this.routeBuilder;
    }

    public async getSerialConnector(): Promise<SerialConnector> {
        if (!this.serialConnector) {
            this.serialConnector = new SerialConnector();
        }
        return this.serialConnector;
    }

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

    public async getSectorService(): Promise<SectorService> {
        if (!this.sectorService) {
            this.sectorService = new SectorService();
            await this.registerEntityService(this.sectorService);
        }
        return this.sectorService;
    }

    public async getRouteService(): Promise<RouteService> {
        if (!this.routeService) {
            this.routeService = new RouteService();
            await this.routeService.loadSchema(this.getSchemaConnection());
            //   await this.registerEntityService(this.routeService);
        }
        return this.routeService;
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
        }
        return this.webSocketServer;
    }

    public getReduxStore(): Store<CombinedState<AppStore>> {
        if (!this.reduxStore) {
            this.reduxStore = createStore(app/*, applyMiddleware(logger)*/);
        }
        return this.reduxStore;
    }

    public async getRestServer(): Promise<RestServer> {
        if (!this.restServer) {
            this.restServer = new RestServer();

            const handler = new Handler(
                (await this.getSignalService()),
                (await this.getSectorService()),
                (await this.getTurnoutService()),
                (await this.getRouteService()),
            );
            this.restServer.server.post('/signal/:signalId', (...args) => handler.requestChangeSignal(...args));

            this.restServer.server.post('/sector/:sectorId', (...args) => handler.requestChangeSector(...args));

            this.restServer.server.post('/turnout/:turnoutId', (...args) => handler.requestChangeTurnout(...args));

            this.restServer.server.post('/route/build/:routeId', (...args) => handler.requestRouteBuild(...args));

        }
        return this.restServer;
    }

    private async registerEntityService(service: AbstractService<any, any, any>) {
        await service.loadSchema(this.getSchemaConnection());
    }
}

export const container = new Container();
