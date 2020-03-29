import { logger } from './webSocetServer';
import { locoNetConnector } from './inc/SerialConnector/SerialConnector';
import { autoBlockSectorFactory } from './inc/Factories/ABSectorsFactory';
import { signalFactory } from './inc/Factories/SignalsFactory';
import { sectorFactory } from './inc/Factories/SectorsFactory';
import { biDirAutoBlockFactory } from './inc/Factories/BiDirABsFactory';

class Main {

    public async run() {
        logger.run();

        locoNetConnector.registerListener(autoBlockSectorFactory);
        locoNetConnector.registerListener(signalFactory);
        locoNetConnector.registerListener(sectorFactory);
        locoNetConnector.registerListener(biDirAutoBlockFactory);
        locoNetConnector.tryConnect();
        console.log('run');
    }
}

setTimeout(() => (new Main()).run(), 2000);
