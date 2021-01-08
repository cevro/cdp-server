import ModelSector from '../models/modelSector';
import AbstractService from 'app/schema/services/abstractService';

export default class ServiceSector extends AbstractService<ModelSector> {

    protected getModelClass() {
        return ModelSector;
    }

    protected getTableName(): string {
        return 'sector';
    }
}
