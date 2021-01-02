import AbstractModel from 'app/schema/models/abstractModel';
import { Connection } from 'mysql';

export default abstract class AbstractService<M extends AbstractModel<any>> {

    public findByUId(uId: string): M {
        const candidates = this.getAll().filter((model) => {
            return model.getUId() === uId;
        });
        if (candidates.length !== 1) {
            throw Error('Cannot find a model');
        }
        return candidates[0];
    }

    public abstract loadSchema(connection: Connection): Promise<void>;

    public abstract getAll(): M[];
}
