import { Aspects } from 'app/./aspects';
import RouteLock from 'app/routeLock';

export default class AspectStrategy {

    public readonly NAVEST_40_A_OCAKAVAJ_40 = 7;
    public readonly NAVEST_40_A_VOLNO = 4;
    public readonly NAVEST_40_A_VYSTRAHA = 6;
    public readonly NAVEST_OCAKAVAJ_40 = 3;
    public readonly NAVEST_STOJ = Aspects.ASPECT_STOP;
    public readonly NAVEST_VOLNO = Aspects.ASPECT_EXPECT_CLEAR;
    public readonly NAVEST_VYSTRAHA = Aspects.ASPECT_EXPECT_STOP;

    public static calculate(routeLock: RouteLock): number {

        let endSignalId = routeLock.route.endSignal.displayAspect;
        if (routeLock.buildOptions.PN) {
            return 8;
        }
        if (routeLock.buildOptions.alert) {
            endSignalId = 0;
        }
        if (routeLock.route.speed !== null || routeLock.buildOptions['40']) {
            return this.getSignalToSide(endSignalId, routeLock.route.sufficientDistance);
        } else {
            return this.getSignalStraight(endSignalId, routeLock.route.sufficientDistance);
        }
    };

    private static getSignalToSide(endSignalId: number, sufficientDistance: boolean) {

        switch (endSignalId) {
            case 0:
            case 8:
            case 9:
            case 10:
            case 12:
            case 15:
                return sufficientDistance ? 6 : 15;
            case 1:
            case 2:
            case 3:
            case 11:
                return 4;
            case 4:
            case 6:
            case 7:
            case 14:
            case 16:
                return 7;
            default:
                return 0;
        }

    };

    private static getSignalStraight(endSignalId: number, sufficientDistance: boolean): number {
        switch (endSignalId) {
            case 0:
            case 8:
            case 9:
            case 10:
            case 12:
            case 15:
                return 2;
            case 1:
            case 2:
            case 3:
            case 11:
                return 1;
            case 4:
            case 6:
            case 7:
            case 14:
            case 16:
                return 3;
            default:
                return 0;
        }
    };
};
