import * as mysql from 'mysql';
import { signalFactory } from 'app/schema/services/signalService';

class SchemaLoader {

    private readonly connection: mysql.Connection;

    constructor() {
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'cdp_scheme',
        });
    }

    public load(): void {
        this.connection.connect();
        signalFactory.loadSchema(this.connection);

        this.connection.end();
    }
}

export const schemaLoader = new SchemaLoader();
