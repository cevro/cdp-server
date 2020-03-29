import Turnout from './Turnout';
import { turnoutsFactory } from '../../Factories/TurnoutsFactory';
import { RequestedTurnoutPosition } from '@definitions/points';

export default class TurnoutPosition {
    private readonly position: RequestedTurnoutPosition;
    private readonly point: Turnout;
    private readonly safePositions: TurnoutPosition[];

    constructor(
        pointId: number,
        position: RequestedTurnoutPosition,
        safePositions: { id: number, position: RequestedTurnoutPosition }[] = [],
    ) {
        this.point = turnoutsFactory.findById(pointId);
        this.position = position;

        this.safePositions = safePositions.map(({id, position}) => {
            return new TurnoutPosition(id, position);
        });
    };

    public async lock(id: number) {
        for (const index in this.safePositions) {
            const pos = this.safePositions[index];
            await pos.lock(id);
        }
        await this.point.lock(id, this.position);
        return;
    }

    public check() {
        for (const index in this.safePositions) {
            const pos = this.safePositions[index];
            pos.check();
        }
        this.point.check(this.position);
        return;
    }

    public unlock(id: number) {
        for (const index in this.safePositions) {
            const pos = this.safePositions[index];
            pos.unlock(id);
        }
        this.point.unlock(id);
        return;
    }

    public unlockBySector(id: number, sectorId: number) {
        if (this.point.sector === sectorId) {
            this.unlock(id);
        }
        return;
    }
}
