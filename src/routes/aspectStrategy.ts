import { RouteLock } from 'app/routes/routeLock';
import { Aspect } from 'app/consts/interfaces/signal';

export default class AspectStrategy {

    public static calculate(routeLock: RouteLock): number {

        let endSignalId = routeLock.getRoute().endSignal ? routeLock.getRoute().endSignal.getDisplayedAspect() : Aspect.CLEAR;
        if (routeLock.buildOptions.PN) {
            return Aspect.PN;
        }
        if (routeLock.buildOptions.alert) {
            endSignalId = Aspect.STOP;
        }
        if (routeLock.getRoute().speed !== null || routeLock.buildOptions['40']) {
            return this.calculateReduceSpeed40(endSignalId, routeLock.getRoute().sufficientDistance);
        } else {
            return this.calculateStraight(endSignalId, routeLock.getRoute().sufficientDistance);
        }
    }

    private static calculateReduceSpeed40(endSignalId: number, sufficientDistance: boolean) {

        switch (endSignalId) {
            case Aspect.STOP:
            case Aspect.PN:
            case Aspect.SHUNT_ALLOWED:
            case Aspect.UNSECURED_SHUNT_ALLOWED:
            case Aspect.REPEAT_EXPECT_STOP:
            case Aspect.REPEAT_EXPECT_STOP_WITH_REDUCE_SPEED:
                return sufficientDistance ? Aspect.EXPECT_STOP_WITH_REDUCE_SPEED : Aspect.REPEAT_EXPECT_STOP_WITH_REDUCE_SPEED;
            case Aspect.CLEAR:
            case Aspect.EXPECT_STOP:
            case Aspect.EXPECT_REDUCE_SPEED:
            case Aspect.REPEAT_CLEAR:
                return Aspect.CLEAR_WITH_REDUCE_SPEED;
            case Aspect.CLEAR_WITH_REDUCE_SPEED:
            case Aspect.EXPECT_STOP_WITH_REDUCE_SPEED:
            case Aspect.EXPECT_REDUCE_SPEED_WITH_REDUCE_SPEED:
            case Aspect.REPEAT_EXPECT_REDUCE_SPEED:
                return Aspect.EXPECT_REDUCE_SPEED_WITH_REDUCE_SPEED;
            default:
                return Aspect.STOP;
        }
    }

    private static calculateStraight(endSignalId: number, sufficientDistance: boolean): number {
        switch (endSignalId) {
            case Aspect.STOP:
            case Aspect.PN:
            case Aspect.SHUNT_ALLOWED:
            case Aspect.UNSECURED_SHUNT_ALLOWED:
            case Aspect.REPEAT_EXPECT_STOP:
            case Aspect.REPEAT_EXPECT_STOP_WITH_REDUCE_SPEED:
                return Aspect.EXPECT_STOP;
            case Aspect.CLEAR:
            case Aspect.EXPECT_STOP:
            case Aspect.EXPECT_REDUCE_SPEED:
            case Aspect.REPEAT_CLEAR:
                return Aspect.CLEAR;
            case Aspect.CLEAR_WITH_REDUCE_SPEED:
            case Aspect.EXPECT_STOP_WITH_REDUCE_SPEED:
            case Aspect.EXPECT_REDUCE_SPEED_WITH_REDUCE_SPEED:
            case Aspect.REPEAT_EXPECT_REDUCE_SPEED:
                return Aspect.EXPECT_REDUCE_SPEED;
            default:
                return Aspect.STOP;
        }
    }
}
