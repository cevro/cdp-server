import { container } from 'app/container';
import { eventsCollector } from 'app/glogalEvents/eventCollector';

class Main {

    public async run() {
        (await container.getSerialConnector());
        (await container.getRouteBuilder());
        (await container.getWebSocketServer()).run();
        (await container.getRestServer()).run();
// , '1L-L3', '3-3a', '3a-BE2', '3a-BE1', '3a-3'
        setTimeout(() => {
            eventsCollector.emit('@route-buffer/add-lock', '1L-L1', {
                PN: false,
                40: false,
                alert: false,
            });
        }, 5000);
    }
}

setTimeout(() => (new Main()).run(), 2000);
