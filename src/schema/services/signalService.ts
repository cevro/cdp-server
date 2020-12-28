import Signal from '../models/Signal';
import { Connection } from 'mysql';

class SignalService /*extends LocoNetObjectsFactory<Message, SignalState>*/ {

    public readonly signals: Signal[] = [];

    public async loadSchema(connection: Connection): Promise<void> {
        await new Promise((resolve, reject) => {
            connection.query('SELECT * FROM `signal`;', (error, results) => {
                if (error) {
                    reject(error);
                }
                results.forEach((row) => {
                    this.signals.push(new Signal(row));
                });
                resolve();
            });
        });
    }

    public findById(id: number): Signal {
        return this.signals.filter((signal) => {
            return signal.signalId === id;
        })[0];
    }
}

export const signalFactory = new SignalService();
