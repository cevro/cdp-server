import {
    LocoNetMessage,
    LocoNetReceiver,
    HttpReceiver,
} from '../Factories/DateReceiver';
import {Message, METHOD_TYPE} from '@definitions/messages';
import {logger} from '@app/webSocetServer';

abstract class LocoNetObject<M extends Message, D> implements LocoNetReceiver {

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

    public handleGet(message: Message): void {
        this.sendState();
    }

    public handleDelete(message: Message): void {
    }

    public handlePatch(message: Message): void {
    }

    public handlePost(message: Message): void {
    }

    public handle(method: METHOD_TYPE, message: Message): void {
        switch (method) {
            case "delete":
                return this.handleDelete(message);
            case "get":
                return this.handleGet(message);
            case "patch":
                return this.handlePatch(message);
            case "post":
                return this.handlePost(message);
        }
    }
}

export default LocoNetObject;