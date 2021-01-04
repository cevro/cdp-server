import AbstractModel from 'app/schema/models/abstractModel';
import { Connection } from 'mysql';
import ReduxConnector from 'app/reduxConnector';
import { MapObjects } from 'app/consts/messages';

export default abstract class AbstractService<M extends AbstractModel<A, R>, S = void, D = void, A = {}, R = any>
    extends ReduxConnector<S & {
        models: MapObjects<M>;
    }, D & {
        init(model: M): void;
        update(model: M): void;
    }> {

    constructor() {
        super();
        this.connect();
    }

    public findByUId(uId: string): M {
        if (this.getAll().hasOwnProperty(uId)) {
            return this.getAll()[uId];
        }
        throw Error('Cannot find a model:' + uId);
    }

    public loadSchema(connection: Connection): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            connection.query('SELECT * FROM `' + this.getTableName() + '`;', (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                results.forEach((row: R) => {
                    const sector = new (this.getModelClass())(row);
                    this.reduxProps.dispatch.init(sector);
                });
                resolve();
            });
        });
    }

    public getAll(): MapObjects<M> {
        return this.reduxProps.state.models;
    }

    protected abstract getModelClass(): new(row: R) => M;

    protected abstract getTableName(): string;
}
