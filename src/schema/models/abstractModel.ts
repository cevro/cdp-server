export default abstract class AbstractModel<P = {}, R = any> {

    public abstract getUId(): string;

    public abstract toArray(): P;
}
