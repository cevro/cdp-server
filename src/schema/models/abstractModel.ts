import ReduxConnector from 'app/reduxConnector';

export default abstract class AbstractModel<P, S = any, D = any> extends ReduxConnector<S, D> {

    protected entityName: string;

    protected constructor(entityName: string) {
        super();
        this.entityName = entityName;
    }

    public abstract getUId(): string;

    public abstract toArray(): P;
}
