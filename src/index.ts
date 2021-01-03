import { container } from 'app/container';

class Main {

    public async run() {
        (await container.getRouteBuilder());
        (await container.getWebSocketServer()).run();
        (await container.getRestServer()).run();

        //  locoNetConnector.registerListener(autoBlockSectorFactory);
        //    locoNetConnector.registerListener(signalFactory);
        // locoNetConnector.registerListener(sectorFactory);
        // locoNetConnector.registerListener(biDirAutoBlockFactory);
        // locoNetConnector.tryConnect();
        // console.log('run');
    }
}

setTimeout(() => (new Main()).run(), 2000);
