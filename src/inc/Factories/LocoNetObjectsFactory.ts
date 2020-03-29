import {
    LocoNetMessage,
    LocoNetReceiver,
    HttpReceiver,
} from './DateReceiver';
import {Message, METHOD_TYPE} from '@definitions/messages';
import LocoNetObject from '../objects/LocoNetObject';

abstract class LocoNetObjectsFactory<M extends Message, D = any> implements HttpReceiver<M>, LocoNetReceiver {

    protected abstract getObjects(): LocoNetObject<M, D>[];


    public handlePatch(message: M): void {
        return this.handle('patch', message);
    }

    public handleGet(message: M): void {
        return this.handle('get', message);
    }

    public handlePost(message: M): void {
        return this.handle('post', message);
    }

    public handleDelete(message: M): void {
        return this.handle('delete', message);
    }

    private handle(method: METHOD_TYPE, message: M) {
        this.getObjects().forEach((object) => {
            if (this.matchMessage(message, object)) {
                object.handle(method, message);
            }
        });
    }

    protected matchMessage(message: M, object: LocoNetObject<M, D>): boolean {
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

}

export default LocoNetObjectsFactory;