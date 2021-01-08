import { EventEmitter } from 'events';

export const eventsCollector = new EventEmitter();
console.log(eventsCollector.getMaxListeners());
eventsCollector.setMaxListeners(100);

export abstract class EventsConnector {
    protected getContainer(): EventEmitter {
        return eventsCollector;
    }
}
