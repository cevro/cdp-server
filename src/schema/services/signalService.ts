import ModelSignal from '../models/modelSignal';
import { Connection } from 'mysql';
import AbstractService from 'app/schema/services/abstractService';

export default class SignalService extends AbstractService<ModelSignal> {

    public readonly signals: ModelSignal[] = [];

    public async loadSchema(connection: Connection): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            connection.query('SELECT * FROM `signal`;', (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                results.forEach((row) => {
                    const signal = new ModelSignal(row);
                    this.signals.push(signal);
                });
                resolve();
            });
        });
    }

    public getAll(): ModelSignal[] {
        return this.signals;
    }
}
