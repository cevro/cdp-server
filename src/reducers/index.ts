import { combineReducers } from 'redux';
import { signals, SignalsState } from './signal';
import { turnouts, TurnoutState } from 'app/reducers/turnout';
import { RouteBuilderState, routeBuilder } from 'app/reducers/routeBuilder';

export const app = combineReducers({
    signals,
    turnouts,
    routeBuilder,
});

export interface AppStore {
    signals: SignalsState;
    turnouts: TurnoutState;
    routeBuilder: RouteBuilderState;
}
