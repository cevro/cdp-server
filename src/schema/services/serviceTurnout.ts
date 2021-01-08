import ModelTurnout from '../models/modelTurnout';
import AbstractService from 'app/schema/services/abstractService';

export default class ServiceTurnout extends AbstractService<ModelTurnout> {

    protected getModelClass() {
        return ModelTurnout;
    }

    protected getTableName(): string {
        return 'turnout';
    }
}
