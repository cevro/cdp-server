import ModelSector from '../models/modelSector';
import AbstractService from 'app/schema/services/abstractService';
import { Connection } from 'mysql';

export default class SectorService extends AbstractService<ModelSector> {

    private readonly sectors: ModelSector[] = [];

    public getAll(): ModelSector[] {
        return this.sectors;
    }

    public loadSchema(connection: Connection): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            connection.query('SELECT * FROM `sector`;', (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                results.forEach((row) => {
                    const sector = new ModelSector(row);
                    this.sectors.push(sector);
                });
                resolve();
            });
        });
    }
}
