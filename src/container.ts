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
import { BadRequestError, NotFoundError } from 'restify-errors';
import SectorService from 'app/schema/services/sectorService';

export default class Container {
    private signalService: SignalService = null;
    private turnoutService: TurnoutService = null;
    private sectorService: SectorService = null;

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

    public async getSectorService(): Promise<SectorService> {
        if (!this.sectorService) {
            this.sectorService = new SectorService();
            await this.registerEntityService(this.sectorService);
        }
        return this.sectorService;
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
            const services = [await this.getTurnoutService(), await this.getSignalService(), await this.getSectorService()];
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

    public async getRestServer(): Promise<RestServer> {
        if (!this.restServer) {
            this.restServer = new RestServer();
            const signalService = await this.getSignalService();
            this.restServer.server.post('/signal/:signalId', (req, response, next) => {
                const signal = signalService.findById(req.params.signalId);
                if (!signal) {
                    return next(new NotFoundError('Signal ' + req.params.signalId + ' no found'));
                }
                const body = JSON.parse(req.body);
                if (!body.hasOwnProperty('aspect')) {
                    return next(new BadRequestError('Param aspect is not included'))
                }
                signal.requestChange(body.aspect);
                response.send(JSON.stringify({message: 'Done'}));
                next(false);
            });
            const sectorService = await this.getSectorService();
            this.restServer.server.post('/sector/:sectorId', (req, response, next) => {
                const sector = sectorService.findById(req.params.sectorId);
                if (!sector) {
                    return next(new NotFoundError('Sector ' + req.params.sectorId + ' no found'));
                }
                const body = JSON.parse(req.body);
                if (!body.hasOwnProperty('state')) {
                    return next(new BadRequestError('Param state is not included'))
                }
                sector.setState(body.state);
                response.send(JSON.stringify({message: 'Done'}));
                next(false);
            });

            const turnoutService = await this.getTurnoutService();
            this.restServer.server.post('/turnout/:turnoutId', (req, response, next) => {
                const turnout = turnoutService.findById(req.params.turnoutId);
                if (!turnout) {
                    return next(new NotFoundError('Turnout ' + req.params.turnoutId + ' no found'));
                }
                const body = JSON.parse(req.body);
                if (!body.hasOwnProperty('position')) {
                    return next(new BadRequestError('Param position is not included'))
                }
                turnout.requestChange(body.position);
                response.send(JSON.stringify({message: 'Done'}));
                next(false);
            });
        }
        return this.restServer;
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
