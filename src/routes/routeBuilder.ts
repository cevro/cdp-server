import ModelRoute from 'app/schema/models/modelRoute';
import { BackendRouteLock } from 'app/consts/interfaces/routeLock';
import BuildOptions = BackendRouteLock.BuildOptions;
import { RouteLock } from 'app/routes/routeLock';
import ReduxConnector from 'app/reduxConnector';

export default class RouteBuilder extends ReduxConnector {

    private locked: boolean = false;
    private buffer: RouteLock[] = [];

    public constructor() {
        super();
    }

    public buildRoute(route: ModelRoute, buildOptions: BuildOptions): void {
        const lock = new RouteLock(route, buildOptions);
        this.buffer.push(lock);
    }

    public destroyRoute(routeLock: RouteLock) {
        routeLock.destroyRoute();

        this.buffer = this.buffer.filter((bufferLock) => {
            return routeLock.lockUId !== bufferLock.lockUId;
        });
    }

    public toArray(): any {
        return {
            locked: this.locked,
            buffer: this.buffer.map((lock) => {
                return lock.toArray();
            }),
        };
    }

    protected reduxPropsChanged() {
        super.reduxPropsChanged();
        this.tryBuild();
    }

    private async tryBuild(): Promise<void> {
        if (this.isLocked()) {
            return;
        }

        const routeLock = this.findFirstNotBuiltRoute();
        if (!routeLock) {
            return;
        }

        this.lock();
        await routeLock.build();
        this.unlock();
    }

    private findFirstNotBuiltRoute(): RouteLock {
        const routes = this.buffer.filter((lock) => {
            return lock.getState() === 'waiting';
        });
        if (routes.length) {
            return routes[0];
        }
        return null;
    }

    private lock(): void {
        this.locked = true;
    }

    private unlock(): void {
        this.locked = false;
    }

    private isLocked(): boolean {
        return this.locked;
    }
}
