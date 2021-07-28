import ServiceSignal from 'app/schema/services/serviceSignal';
import ServiceTurnout from 'app/schema/services/serviceTurnout';
import { Connection } from 'mysql';
import * as mysql from 'mysql';
import { config } from 'app/config.local';
import { WebSocketServer } from 'app/server/webSocketServer';
import AbstractService from 'app/schema/services/abstractService';
import RestServer from 'app/server/restServer';
import ServiceSector from 'app/schema/services/serviceSector';
import Handler from 'app/server/handlers/handler';
import RouteLockBuffer from 'app/routes/routeLockBuffer';
import SerialConnector from 'app/serialConnector';
import ServiceRoute from 'app/schema/services/serviceRoute';

class Container {

    private serviceSignal: ServiceSignal;
    private serviceTurnout: ServiceTurnout;
    private serviceSector: ServiceSector;
    private serviceRoute: ServiceRoute;

    private serialConnector: SerialConnector;
    private routeBuilder: RouteLockBuffer;
    private schemaConnection: mysql.Connection;

    private webSocketServer: WebSocketServer;
    private restServer: RestServer;

    public async getRouteBuilder(): Promise<RouteLockBuffer> {
        if (!this.routeBuilder) {
            this.routeBuilder = new RouteLockBuffer(
                (await this.getServiceRoute()),
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

    public async getServiceSignal(): Promise<ServiceSignal> {
        if (!this.serviceSignal) {
            this.serviceSignal = new ServiceSignal();
            await this.registerEntityService(this.serviceSignal);
        }
        return this.serviceSignal;
    }

    public async getServiceTurnout(): Promise<ServiceTurnout> {
        if (!this.serviceTurnout) {
            this.serviceTurnout = new ServiceTurnout();
            await this.registerEntityService(this.serviceTurnout);
        }
        return this.serviceTurnout;
    }

    public async getServiceSector(): Promise<ServiceSector> {
        if (!this.serviceSector) {
            this.serviceSector = new ServiceSector();
            await this.registerEntityService(this.serviceSector);
        }
        return this.serviceSector;
    }

    public async getServiceRoute(): Promise<ServiceRoute> {
        if (!this.serviceRoute) {
            this.serviceRoute = new ServiceRoute(
                (await this.getServiceSignal()),
                (await this.getServiceSector()),
                (await this.getServiceTurnout()),
            );
            await this.registerEntityService(this.serviceRoute);
        }
        return this.serviceRoute;
    }

    public getSchemaConnection(): Connection {
        if (!this.schemaConnection) {
            this.schemaConnection = mysql.createConnection(config.schemaDatabase);
        }
        return this.schemaConnection;
    }

    public async getWebSocketServer(): Promise<WebSocketServer> {
        if (!this.webSocketServer) {
            this.webSocketServer = new WebSocketServer(
                (await this.getServiceSignal()),
                (await this.getServiceSector()),
                (await this.getServiceTurnout()),
            );
        }
        return this.webSocketServer;
    }

    public async getRestServer(): Promise<RestServer> {
        if (!this.restServer) {
            this.restServer = new RestServer();

            const handler = new Handler(
                (await this.getServiceSignal()),
                (await this.getServiceSector()),
                (await this.getServiceTurnout()),
                (await this.getServiceRoute()),
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
