import { Aspect } from 'app/consts/interfaces/signal';
import { BackendRouteLock } from 'app/consts/interfaces/routeLock';
import BuildOptions = BackendRouteLock.BuildOptions;
import ModelRoute from 'app/schema/models/modelRoute';

export default class AspectStrategy {

    public static calculate(buildOptions: BuildOptions, route: ModelRoute): number {
        let endSignalId = route.endSignalUId ? route.reduxProps.state.endSignal.displayedAspect : Aspect.CLEAR;
        if (buildOptions.PN) {
            return Aspect.PN;
        }
        if (buildOptions.alert) {
            endSignalId = Aspect.STOP;
        }
        if (route.speed !== null || buildOptions['40']) {
            return this.calculateReduceSpeed40(endSignalId, route.sufficientDistance);
        } else {
            return this.calculateStraight(endSignalId, route.sufficientDistance);
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