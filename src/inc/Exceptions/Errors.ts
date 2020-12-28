import Turnout from '../../schema/models/Turnout/Turnout';
import {TurnoutPosition} from "app/consts/turnouts";

export class PointLockedError extends Error {
    constructor(point: Turnout, position: TurnoutPosition) {
        super();
        this.message = 'Cannot get requested position(' + point.getLocoNetId() + (position === 1 ? '+' : '-') + ') for locking.';
    }
}

export class PointPositionChangeError extends Error {
    constructor(point: Turnout, position: TurnoutPosition) {
        super();
        this.message = 'Cannot change position(' + point.getLocoNetId() + (position === 1 ? '+' : '-') + ') because is already locked by another route.';
    }
}

export class PointPositionChangingError extends Error {
    constructor(point: Turnout, position: TurnoutPosition) {
        super();
        this.message = 'Error during changing position(' + point.getLocoNetId() + (position === 1 ? '+' : '-') + ').';
    }
}
