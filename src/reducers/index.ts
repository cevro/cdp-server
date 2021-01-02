import { combineReducers } from 'redux';
import { signals, SignalsState } from './signal';

export const app = combineReducers({
    signals,
});

export interface AppStore {
    signals: SignalsState;
}
