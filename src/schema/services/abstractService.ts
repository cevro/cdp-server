import AbstractModel from 'app/schema/models/abstractModel';
import { Connection } from 'mysql';
import { MapObjects } from 'app/consts/messages';
import { EventsConnector } from 'app/glogalEvents/eventCollector';
import SerialConnector from 'app/serialConnector';

export default abstract class AbstractService<M extends AbstractModel<A, R>, A = {}, R = any> extends EventsConnector {

    protected models: MapObjects<M> = {};

    protected readonly serial: SerialConnector;

    constructor(serial: SerialConnector) {
        super();
        this.serial = serial;
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
                    const model = new (this.getModelClass())(this.serial, row);
                    this.models[model.getUId()] = model;
                });
                resolve();
            });
        });
    }

    public getAll(): MapObjects<M> {
        return this.models;
    }

    protected abstract getModelClass(): new(serial: SerialConnector, row: R) => M;

    protected abstract getTableName(): string;
}
