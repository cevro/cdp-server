import * as mysql from 'mysql';
import { signalService } from 'app/schema/services/signalService';
import { config } from 'app/config.local';

class SchemaLoader {

    private readonly connection: mysql.Connection;

    constructor() {
        this.connection = mysql.createConnection(config.schemaDatabase);
    }

    public async load(): Promise<void> {
        this.connection.connect();
        await signalService.loadSchema(this.connection);

        this.connection.end();
    }
}

export const schemaLoader = new SchemaLoader();
