
import { WebSocketServer } from 'app/server/webSocketServer';
import { WebSocketStateUpdateMessage } from 'app/consts/messages';
import { connection } from 'websocket';
import AbstractService from 'app/schema/services/abstractService';

export default class SchemaLoader {
    private readonly services: AbstractService<any>[];

    constructor(services: AbstractService<any>[]) {
        this.services = services;
    }

    public async load(webSocketServer: WebSocketServer): Promise<void> {

    }
}
