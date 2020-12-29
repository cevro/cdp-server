import { schemaLoader } from 'app/schema/schemaLoader';
import { webSocketServer } from 'app/server/webSocketServer';
import { restServer } from 'app/server/restServer';

class Main {

    public async run() {
        await schemaLoader.load();
        webSocketServer.run();
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
