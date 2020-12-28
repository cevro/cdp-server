import {
    LocoNetMessage,
    LocoNetReceiver,
} from 'app/schema/services/DateReceiver';
import { Message, METHOD_TYPE } from '@definitions/messages';
import { logger } from 'app/webSocetServer';

abstract class LocoNetObject<D> implements LocoNetReceiver {

    protected readonly locoNetId: number;
    private readonly entityName: string;

    protected constructor(locoNetId: number, entityName: string) {
        this.locoNetId = locoNetId;
        this.entityName = entityName;
    }

    public getLocoNetId(): number {
        return this.locoNetId;
    }

    public getEntityName(): string {
        return this.entityName;
    }

    public sendState() {
        logger.log<Message<D>>({
            uri: this.getEntityName() + '/' + this.getLocoNetId(),
            method: 'patch',
            data: this.toObject(),
        });
    }

    public abstract handleLocoNetReceive(message: LocoNetMessage): void;

    public abstract toObject(): D;

    protected handleGet(message: Message): void {
        this.sendState();
    }

    protected handleDelete(message: Message): void {
    }

    protected handlePatch(message: Message): void {
    }

    protected handlePost(message: Message): void {
    }

    public handle(method: METHOD_TYPE, message: Message): void {
        switch (method) {
            case 'delete':
                return this.handleDelete(message);
            case 'get':
                return this.handleGet(message);
            case 'patch':
                return this.handlePatch(message);
            case 'post':
                return this.handlePost(message);
        }
    }
}

export default LocoNetObject;
