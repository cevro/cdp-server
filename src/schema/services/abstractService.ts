import AbstractModel from 'app/schema/models/abstractModel';
import { Connection } from 'mysql';
import { MapObjects } from 'app/consts/messages';
import { EventsConnector } from 'app/glogalEvents/eventCollector';

export default abstract class AbstractService<M extends AbstractModel<A, R>, A = {}, R = any> extends EventsConnector {

    protected models: MapObjects<M> = {};

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
                    const model = new (this.getModelClass())(row);
                    this.models[model.getUId()] = model;
                });
                resolve();
            });
        });
    }

    public getAll(): MapObjects<M> {
        return this.models;
    }

    public serialise(): MapObjects<A> {
        const data: MapObjects<A> = {};
        const models = this.getAll();
        for (const uId in models) {
            if (models.hasOwnProperty(uId)) {
                const model = models[uId];
                data[model.getUId()] = model.toArray();
            }
        }
        return data;
    }

    protected abstract getModelClass(): new(row: R, ...attrs: any[]) => M;

    protected abstract getTableName(): string;
}
