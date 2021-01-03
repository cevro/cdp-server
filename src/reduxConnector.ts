import { Dispatch, CombinedState, Action } from 'redux';
import { AppStore } from 'app/reducers';
import { container } from 'app/container';

export interface ReduxProps<S, D> {
    state: S;
    dispatch: D;
}

export default abstract class ReduxConnector<S = void, D = void> {

    public reduxProps: ReduxProps<S, D> = {state: undefined, dispatch: undefined};

    protected reduxWillConnect(): void {
    }

    protected reduxDidConnected(): void {
    }

    protected reduxPropsWillUpdate(newProps: ReduxProps<S, D>): void {
    }

    protected reduxPropsDidUpdated(): void {
    }

    protected connect(): void {
        const reduxStore = container.getReduxStore();
        this.reduxWillConnect();
        reduxStore.subscribe(() => {
            this.innerPullReduxStore();
        });
        this.forcePullReduxStore();
        this.reduxDidConnected();
    }

    public forcePullReduxStore(): void {
        this.innerPullReduxStore();
    }

    protected abstract mapState(state: CombinedState<AppStore>): S;

    protected abstract mapDispatch(dispatch: Dispatch<Action<string>>): D;

    private innerPullReduxStore() {
        const reduxStore = container.getReduxStore();
        const newState: ReduxProps<S, D> = {
            state: this.mapState(reduxStore.getState()),
            dispatch: this.mapDispatch(reduxStore.dispatch),
        };
        this.reduxPropsWillUpdate(newState);
        this.reduxProps = newState;
        this.reduxPropsDidUpdated();
    }
}
