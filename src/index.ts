import RestServer from 'app/server/restServer';
import { BadRequestError, NotFoundError } from 'restify-errors';
import Container from 'app/container';

class Main {
    private readonly container: Container;

    constructor() {
        this.container = new Container();
    }

    public async run() {

        (await this.container.getWebSocketServer()).run();

        const restServer = new RestServer();
        const signalService = await this.container.getSignalService();
        restServer.server.post('/signal/:signalId', (req, response, next) => {
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

        restServer.run();


        //  locoNetConnector.registerListener(autoBlockSectorFactory);
        //    locoNetConnector.registerListener(signalFactory);
        // locoNetConnector.registerListener(sectorFactory);
        // locoNetConnector.registerListener(biDirAutoBlockFactory);
        // locoNetConnector.tryConnect();
        // console.log('run');
    }

}

setTimeout(() => (new Main()).run(), 2000);
