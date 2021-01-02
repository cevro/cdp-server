import { ENTITY_SIGNAL } from 'app/consts/entity';
import AbstractModel from 'app/schema/models/abstractModel';
import { Aspect, BackendSignal } from 'app/consts/interfaces/signal';
import { aspectChanged, initSignal } from 'app/actions/signal';
import { CombinedState } from 'redux';
import { AppStore } from 'app/reducers';

interface DispatchObject {
    onInit: () => void;
    onChangeAspect: (aspect: number) => void;
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
        this.requestChange(Aspect.STOP);
        setTimeout(() => {

            this.confirmChange(Aspect.STOP);
        }, 1000);
    }

    public getDisplayedAspect() {
        return this.reduxProps.state.requestedAspect;
    }

    /* public handleLocoNetReceive(data: LocoNetMessage): void {
         switch (data.type) {
             case 'a':
                 console.log('a');
                 return this.confirmChange(data.value);
             case 'r':
                 return console.log('r');
         }
         return;
     }*/

    public requestChange(aspect: number): void {
        this.change(aspect);
        /*if (aspect === this.requestedAspect) {
            return;
        }
        this.requestedAspect = +aspect;
        ;*/

        /*  locoNetConnector.send({
              locoNetId: 1,// this.locoNetId,
              type: 'a',
              value: aspect,
          });*/
        //   this.sendState();
    }

    public change(aspect: number) {
        setTimeout(() => {

            this.confirmChange(aspect);
        }, 2000);
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

    public confirmChange(value: number): void {
        this.reduxProps.dispatch.onChangeAspect(value);
    }

    protected reduxStoreConnected() {
        super.reduxStoreConnected();
        this.reduxProps.dispatch.onInit();
    }

    protected mapDispatch(dispatch) {
        const signalUId = this.getUId();
        return {
            onInit: () => dispatch(initSignal(signalUId)),
            onChangeAspect: (aspect: number) => dispatch(aspectChanged(signalUId, aspect)),
        };
    }

    public mapState(store: CombinedState<AppStore>) {
        return {
            ...store.signals[this.getUId()],
        };
    }
}
