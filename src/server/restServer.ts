import { signalService } from 'app/schema/services/signalService';
import { ENTITY_SIGNAL } from 'app/consts/entity';
import { createServer, plugins } from 'restify';
import { BadRequestError, NotFoundError } from 'restify-errors';
import bodyParser = plugins.bodyParser;


export const restServer = new class RestServer {
    public run(): void {
        const server = createServer({
            name: 'localhost',
        });
        server.use((req, res, next) => {
                res.header('Access-Control-Allow-Origin', '*');
                res.header('Access-Control-Allow-Headers', 'X-Requested-With');
                return next();
            },
        );
        server.use(bodyParser());
        server.get('/', (matchedGroups, response, connection) => {
            const data = {
                [ENTITY_SIGNAL]: signalService.signals.map((signal) => {
                    return signal.toArray();
                }),
                // [ENTITY_SECTOR]: sectorFactory.dump(),
                // [ENTITY_TURNOUT]: turnoutsService.dump(),
                // routeBuilder: routeBuilder.dumpBuffer(),
                // [ENTITY_AB_SECTOR]: autoBlockSectorFactory.dump(),
                // [ENTITY_BI_DIR_AB]: biDirAutoBlockFactory.dump(),
            };
            response.send(JSON.stringify(data));
        });
        server.post('/signal/:signalId', (req, response, next) => {
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

        server.listen(8082, () => {
            console.log('%s listening at %s', server.name, server.url);
        });
    }
}
