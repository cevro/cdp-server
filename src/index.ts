import { schemaLoader } from 'app/schema/schemaLoader';
import { logger } from 'app/webSocetServer';

class Main {

    public async run() {
        schemaLoader.load();
        logger.run();

        //  locoNetConnector.registerListener(autoBlockSectorFactory);
        //    locoNetConnector.registerListener(signalFactory);
        // locoNetConnector.registerListener(sectorFactory);
        // locoNetConnector.registerListener(biDirAutoBlockFactory);
        // locoNetConnector.tryConnect();
        // console.log('run');
    }
}

setTimeout(() => (new Main()).run(), 2000);
