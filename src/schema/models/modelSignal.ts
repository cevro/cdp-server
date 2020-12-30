import { LocoNetMessage } from 'app/inc/DateReceiver';
import { ENTITY_SIGNAL } from 'app/consts/entity';
import AbstractModel from 'app/schema/models/abstractModel';
import { BackendSignal } from 'app/consts/interfaces';


export default class ModelSignal extends AbstractModel<BackendSignal.Snapshot>{

    public readonly signalId: number;
    public readonly signalUId: string;
    public readonly name: string;
    public readonly type: BackendSignal.Type;
    public readonly construction: BackendSignal.Construction;
    public readonly lights: BackendSignal.Light[];
    public readonly spec: {
        lastAutoBlock: boolean;
    };

    public displayAspect: number;
    public requestedAspect: number;

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
        this.displayAspect = -1;
        this.requestedAspect = -1;
    }

    public handleLocoNetReceive(data: LocoNetMessage): void {
        switch (data.type) {
            case 'a':
                console.log('a');
                return this.confirmChange(data.value);
            case 'r':
                return console.log('r');
        }
        return;
    }

    public requestChange(aspect: number): void {
        if (aspect === this.requestedAspect) {
            return;
        }
        this.requestedAspect = aspect;
        this.emit('change');
        setTimeout(() => {
            this.confirmChange(aspect);
        }, 2000);
        /*  locoNetConnector.send({
              locoNetId: 1,// this.locoNetId,
              type: 'a',
              value: aspect,
          });*/
        //   this.sendState();
    }

    public toArray(): BackendSignal.Snapshot {
        return {
            signalId: this.signalId,
            signalUId: this.signalUId,
            name: this.name,
            type: this.type,
            construction: this.construction,
            lights: this.lights,
            displayAspect: this.displayAspect,
            requestedAspect: this.requestedAspect,
            spec: this.spec,
        };
    }

    public getPrimary(): number {
        return this.signalId;
    }

    public getUId(): string {
        return this.signalUId;
    }

    private confirmChange(value: number) {
        if (value === this.displayAspect) {
            return;
        }
        this.displayAspect = value;
        this.emit('change');
    }
}
