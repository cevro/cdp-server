import { EventsConnector } from 'app/glogalEvents/eventCollector';

export default abstract class AbstractModel<P = {}, R = any> extends EventsConnector {

    public abstract getUId(): string;

    public abstract toArray(): P;
}
