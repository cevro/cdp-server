import Signal from '../models/Signal';
import {BuildOptions} from '@definitions/interfaces';

export const SignalStrategy = new class {
    public readonly NAVEST_40_A_OCAKAVAJ_40 = 7;
    public readonly NAVEST_40_A_VOLNO = 4;
    public readonly NAVEST_40_A_VYSTRAHA = 6;
    public readonly NAVEST_OCAKAVAJ_40 = 3;
    public readonly NAVEST_STOJ = 0;
    public readonly NAVEST_VOLNO = 1;
    public readonly NAVEST_VYSTRAHA = 2;

    public calculate(endSignal: Signal, speed: number | null, sufficientDistance: boolean = true, buildOptions: BuildOptions): number {
        let endSignalId = endSignal ? endSignal.getDisplayAspect() : 1;
        if (buildOptions.PN) {
            return 8;
        }
        if (buildOptions.alert) {
            endSignalId = 0;
        }
        if (speed !== null || buildOptions['40']) {
            return this.getSignalToSide(endSignalId, sufficientDistance);
        } else {
            return this.getSignalStraight(endSignalId, sufficientDistance);
        }
    };

    private getSignalToSide(endSignalId: number, sufficientDistance: boolean) {

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

    private getSignalStraight(endSignalId: number, sufficientDistance: boolean): number {
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
