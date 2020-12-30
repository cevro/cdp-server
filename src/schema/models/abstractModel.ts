import { EventEmitter } from 'events';

export default abstract class AbstractModel<S> extends EventEmitter {

    protected entityName: string;

    protected constructor(entityName: string) {
        super();
        this.entityName = entityName;
    }

    public abstract getPrimary(): number;

    public abstract getUId(): string;

    public abstract toArray(): S;
}
