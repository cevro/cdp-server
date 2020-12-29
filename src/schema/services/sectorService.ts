import ModelSector from '../models/modelSector';
import { sectors } from 'app/data/sectors';
import AbstractService from 'app/schema/services/abstractService';
import { Connection } from 'mysql';

export default class SectorService extends AbstractService<ModelSector> {

    private readonly sectors: ModelSector[];

    constructor() {
        super();
        this.sectors = sectors.map(value => {
            return new ModelSector(value);
        });
    }

    public getAll(): ModelSector[] {
        return this.sectors;
    }

    public loadSchema(connection: Connection): Promise<void> {
        return Promise.resolve(undefined);
    }
}

export const sectorFactory = new SectorService();
