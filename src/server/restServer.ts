import { createServer, plugins, Server } from 'restify';
import bodyParser = plugins.bodyParser;
import { config } from 'app/config.local';

export default class RestServer {
    public readonly server: Server;

    constructor() {
        this.server = createServer();
        this.server.pre((req, res, next) => {
                res.header('Access-Control-Allow-Origin', '*');
                res.header('Access-Control-Allow-Headers', 'X-Requested-With');
                return next();
            },
        );
        this.server.use(bodyParser());
    }

    public run(): void {
        this.server.listen(config.restServer.port, () => {
            console.log('%s listening at %s', this.server.name, this.server.url);
        });
    }
}
