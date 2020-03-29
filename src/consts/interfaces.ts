import {TurnoutMessages} from './messages/turnout';
import {
    RequestedTurnoutPosition,
    TurnoutPosition,
} from './points';

export interface LocoNetDefinition {
    locoNetId: number;
}

export interface TrainRouteDump {
    buffer: TrainRouteBufferItem[];
    hasError: boolean;
    locked: boolean;
}

export interface TrainRouteBufferItem {
    id: number;
    state: string;
    name: string;
    reason: string;
    buildOptions: BuildOptions;
}

export interface SectorState extends LocoNetDefinition {
    state: number;
    locked: number;
}

export interface SignalState extends LocoNetDefinition {
    displayAspect: number,
    requestedAspect: number,
}

export interface TurnoutState extends LocoNetDefinition {
    position: TurnoutPosition;
    requestedPosition: RequestedTurnoutPosition;
    locked: number[];
}

export interface ABSectorState extends LocoNetDefinition {
    state: number;
    errorCode: number,
    errorMessage: string,
    active: number,
    blockCondition: number;
}

export type ABRequestedDir = -1 | 0 | 1
export type ABDir = ABRequestedDir | 0;

export interface BiDirABState extends LocoNetDefinition {
    dir: ABDir;
}

export interface BuildOptions {
    PN: boolean;
    40: boolean;
    alert: boolean;
}

export interface DumpData {
    sectors: SectorState[];
    signals: SignalState[];
    points: TurnoutMessages.StateUpdateData[];
    routeBuilder: TrainRouteDump;
    ABSectors: ABSectorState[];
    biDirABs: BiDirABState[];
}

export interface RouteFinderRequest {
    startSignalId: number;
    endSectorId: number;
}

export const MESSAGE_ACTION_STATE_UPDATE = 'state-update';
export const MESSAGE_ACTION_DUMP = 'dump';

export const MESSAGE_ACTION_MESSAGE = 'message';

