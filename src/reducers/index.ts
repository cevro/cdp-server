import { CombinedState, combineReducers, Reducer } from 'redux';
import { SignalReducer } from 'app/reducers/models/signal';
import { TurnoutReducer } from 'app/reducers/models/turnout';
import { routeBuilder, RouteBuilderState } from 'app/reducers/routeBuilder';
import { MapObjects } from 'app/consts/messages';
import { serialConnector, SerialConnectorState } from 'app/reducers/serialConnector';
import { SectorReducer } from 'app/reducers/models/sector';
import ModelSignal from 'app/schema/models/modelSignal';
import ModelTurnout from 'app/schema/models/modelTurnout';
import ModelSector from 'app/schema/models/modelSector';

export const app: Reducer<CombinedState<AppStore>> = combineReducers({
    signals: (new SignalReducer()).app(),
    turnouts: (new TurnoutReducer()).app(),
    sectors: (new SectorReducer()).app(),
    routeBuilder,
    serialConnector,
});

export interface AppStore {
    signals: MapObjects<ModelSignal>;
    turnouts: MapObjects<ModelTurnout>;
    sectors: MapObjects<ModelSector>;
    routeBuilder: RouteBuilderState;
    serialConnector: SerialConnectorState;
}
