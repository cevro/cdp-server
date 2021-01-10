import AbstractService from 'app/schema/services/abstractService';
import { Connection } from 'mysql';
import ModelBiAutoBlock from 'app/schema/models/modelBiAutoBlock';

export default class ServiceBiAutoBlock extends AbstractService<ModelBiAutoBlock> {

    public loadSchema(connection: Connection): Promise<void> {
        [{locoNetId: 450}, {locoNetId: 451}].forEach((value) => {
            this.models[value.locoNetId] = new ModelBiAutoBlock();
        });
        return;
    }

    protected getModelClass() {
        return ModelBiAutoBlock;
    }

    protected getTableName(): string {
        return '';
    }
}
