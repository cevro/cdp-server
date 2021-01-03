import { CombinedState, Dispatch, Action } from 'redux';
import { AppStore } from 'app/reducers';
import ReduxConnector from 'app/reduxConnector';

export class GlobalState {
}

export type MapDispatch<O extends ReduxConnector<S, D>, S, D> = (dispatch: Dispatch<Action<string>>, object: O) => D;

export type MapState<O extends ReduxConnector<S, D>, S, D> = (state: CombinedState<AppStore>, object: O) => S;

export type Connect<O extends ReduxConnector<S, D>, S, D> = (object: ObjectConstructor<O>) => ObjectConstructor<O>;

type ObjectConstructor<O> = new (...args) => O;

export function connect<O extends ReduxConnector<S, D>, S, D>(
    mapState: MapState<O, S, D>,
    mapDispatch: MapDispatch<O, S, D>,
): Connect<O, S, D> {
    return (object) => {
        object.prototype.connect.prototype =  () =>{

        };
        return object;
    };
}
