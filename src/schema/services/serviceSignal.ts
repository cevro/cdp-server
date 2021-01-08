import ModelSignal from '../models/modelSignal';
import AbstractService from 'app/schema/services/abstractService';

export default class ServiceSignal extends AbstractService<ModelSignal> {

    protected getModelClass() {
        return ModelSignal;
    }

    protected getTableName(): string {
        return 'signal';
    }
}
