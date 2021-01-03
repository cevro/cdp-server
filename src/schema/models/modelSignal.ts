import { ENTITY_SIGNAL } from 'app/consts/entity';
import AbstractModel from 'app/schema/models/abstractModel';
import { Aspect, BackendSignal } from 'app/consts/interfaces/signal';
import { SignalActions } from 'app/actions/signal';
import { Action, CombinedState, Dispatch } from 'redux';
import { AppStore } from 'app/reducers';
import { ReduxProps } from 'app/reduxConnector';

interface DispatchObject {
    onInit(): void;

    onChangeAspect(aspect: number): void;

    onRequestChange(aspect: number): void;
}

export default class ModelSignal extends AbstractModel<BackendSignal.Definition, BackendSignal.State, DispatchObject> {

    private readonly signalId: number;
    private readonly signalUId: string;
    private readonly name: string;
    private readonly type: BackendSignal.Type;
    private readonly construction: BackendSignal.Construction;
    private readonly lights: BackendSignal.Light[];
    private readonly spec: {
        lastAutoBlock: boolean;
    };

    public constructor(row: BackendSignal.Row) {
        super(ENTITY_SIGNAL);
        this.signalId = row.signal_id;
        this.signalUId = row.signal_uid;
        this.name = row.name;
        this.construction = row.construction;
        this.type = row.type;
        // @ts-ignore
        this.lights = row.lights.split(',');
        this.spec = {
            lastAutoBlock: row.last_auto_block,
        };
        this.connect();
    }

    protected reduxDidConnected() {
        super.reduxDidConnected();
        this.reduxProps.dispatch.onInit();
        this.reduxProps.dispatch.onRequestChange(Aspect.STOP);
    }

    protected reduxPropsWillUpdate(newProps: ReduxProps<BackendSignal.State, DispatchObject>) {
        super.reduxPropsWillUpdate(newProps);
        if (this.reduxProps.state && newProps.state && this.reduxProps.state.requestedAspect !== newProps.state.requestedAspect) {
            setTimeout(() => {
                this.reduxProps.dispatch.onChangeAspect(newProps.state.requestedAspect);
            }, 2000);
        }
    }

    public toArray(): BackendSignal.Definition {
        return {
            signalId: this.signalId,
            signalUId: this.signalUId,
            name: this.name,
            type: this.type,
            construction: this.construction,
            lights: this.lights,
            spec: this.spec,
        };
    }

    public getUId(): string {
        return this.signalUId;
    }

    protected mapDispatch(dispatch: Dispatch<Action<string>>) {
        return {
            onInit: () => dispatch(SignalActions.init(this.getUId())),
            onChangeAspect: (aspect: number) => dispatch(SignalActions.aspectChanged(this.getUId(), aspect)),
            onRequestChange: (aspect: number) => dispatch(SignalActions.requestChangeAspect(this.getUId(), aspect)),
        };
    }

    protected mapState(store: CombinedState<AppStore>) {
        return {
            ...store.signals[this.getUId()],
        };
    }

}
