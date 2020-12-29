import {
    LocoNetMessage,
    LocoNetReceiver,
} from './DateReceiver';
import { Message, METHOD_TYPE } from '@definitions/messages';
import LocoNetObject from '../models/LocoNetObject';

export default abstract class LocoNetObjectsFactory<M extends Message, D = any> implements LocoNetReceiver {

    protected abstract getObjects(): LocoNetObject<D>[];

    protected matchMessage(message: M, object: LocoNetObject<D>): boolean {
        const match = message.uri.match(/([a-zA-Z_]+)\/([0-9]+)/);
        const [, entity, id] = match;

        if (object.getLocoNetId() === +id) {
            if (object.getEntityName() === entity) {
                return true;
            }
        }
        return false;
    }

    public handleLocoNetReceive(message: LocoNetMessage): void {
        this.getObjects().forEach((object) => {
            if (object.getLocoNetId() === message.locoNetId) {
                object.handleLocoNetReceive(message);
            }
        });
    }

    public dump(): D[] {
        return this.getObjects().map((object) => {
            return object.toObject();
        });
    }

    private handle(method: METHOD_TYPE, message: M) {
        this.getObjects().forEach((object) => {
            if (this.matchMessage(message, object)) {
                object.handle(method, message);
            }
        });
    }

}
