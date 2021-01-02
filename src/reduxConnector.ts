import { Dispatch, CombinedState, Action, Store } from 'redux';
import { AppStore } from 'app/reducers';
import { container } from 'app/container';

export default abstract class ReduxConnector<S = void, D = void> {

    protected reduxProps: {
        state: S;
        dispatch: D;
    } = {state: undefined, dispatch: undefined};

    protected constructor() {
        this.connect();
    }

    protected reduxPropsChanged(): void {
    }

    protected reduxStoreConnected(): void {
    }

    protected mapDispatch(dispatch: Dispatch<Action<string>>): D {
        return;
    }

    protected mapState(state: CombinedState<AppStore>): S {
        return;
    }

    private connect() {
        const reduxStore = container.getReduxStore();
        reduxStore.subscribe(() => {
            this.innerHandleChange(reduxStore);
            this.reduxPropsChanged();
        });
        this.innerHandleChange(reduxStore);
        this.reduxStoreConnected();
    }

    private innerHandleChange(reduxStore: Store<CombinedState<AppStore>>): void {
        this.reduxProps.state = this.mapState(reduxStore.getState());
        this.reduxProps.dispatch = this.mapDispatch(reduxStore.dispatch);
    }

}
