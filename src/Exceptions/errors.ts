import EndPosition = BackendTurnout.EndPosition;
import { BackendTurnout } from 'app/consts/interfaces/turnout';
import ModelTurnout from 'app/schema/models/modelTurnout';

export class PointLockedError extends Error {
    constructor(point: ModelTurnout, position: EndPosition) {
        super();
        // this.message = 'Cannot get requested position(' + point.getLocoNetId() + (position === 1 ? '+' : '-') + ') for locking.';
    }
}

export class PointPositionChangeError extends Error {
    constructor(point: ModelTurnout, position: EndPosition) {
        super();
        // tslint:disable-next-line:max-line-length
        // this.message = 'Cannot change position(' + point.getLocoNetId() + (position === 1 ? '+' : '-') + ') because is already locked by another route.';
    }
}

export class PointPositionChangingError extends Error {
    constructor(point: ModelTurnout, position: EndPosition) {
        super();
        //  this.message = 'Error during changing position(' + point.getLocoNetId() + (position === 1 ? '+' : '-') + ').';
    }
}
