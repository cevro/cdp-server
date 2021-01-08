import { EventsConnector } from 'app/glogalEvents/eventCollector';
import SerialConnector from 'app/serialConnector';

export default abstract class AbstractModel<P = {}, R = any> extends EventsConnector {

    protected readonly serial: SerialConnector;

    protected constructor(serial: SerialConnector) {
        super();
        this.serial = serial;
    }

    public abstract getUId(): string;

    public abstract toArray(): P;
}
