import ModelTurnout from '../models/modelTurnout';
import { Connection } from 'mysql';
import AbstractService from 'app/schema/services/abstractService';

export default class TurnoutService extends AbstractService<ModelTurnout> {

    public readonly turnouts: ModelTurnout[] = [];

    public async loadSchema(connection: Connection): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            connection.query('SELECT * FROM `turnout`;', (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                results.forEach((row) => {
                    const turnout = new ModelTurnout(row);
                    this.turnouts.push(turnout);
                });
                resolve();
            });
        });
    }

    public getAll(): ModelTurnout[] {
        return this.turnouts;
    }
}
