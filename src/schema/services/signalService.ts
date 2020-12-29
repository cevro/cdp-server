import ModelSignal from '../models/modelSignal';
import { Connection } from 'mysql';

class SignalService /*extends LocoNetObjectsFactory<Message, SignalState>*/ {

    public readonly signals: ModelSignal[] = [];

    public async loadSchema(connection: Connection): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            connection.query('SELECT * FROM `signal`;', (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                results.forEach((row) => {
                    this.signals.push(new ModelSignal(row));
                });
                resolve();
            });
        });
    }

    public findById(id: number): ModelSignal {
        const signals = this.signals.filter((signal) => {
            return +signal.signalId === +id;
        });
        return signals[0];
    }
}

export const signalService = new SignalService()
