import { LocoNetMessage } from 'app/schema/services/DateReceiver';
import { webSocketServer } from 'app/server/webSocketServer';
import { ENTITY_SIGNAL } from 'app/consts/entity';

interface QueryRow {
    signal_id: number;
    signal_uid: string;
    name: string;
    loconet_id: number;
    type: 'entry' | 'exit' | 'path' | 'auto_block' | 'shunt';
    construction: 'T' | 'K' | null
    last_auto_block: boolean;
    lights: string;
}

export default class ModelSignal /*extends LocoNetObject<SignalState>*/ implements Signal.State {

    public readonly signalId: number;
    public readonly signalUId: string;
    public readonly name: string;
    public readonly type: Signal.Type;
    public readonly construction: Signal.Construction;
    public readonly lights: Signal.Light[];
    public readonly spec: {
        lastAutoBlock: boolean;
    };

    public displayAspect: number;
    public requestedAspect: number;

    public constructor(row: QueryRow) {
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
        this.logChange();
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

    public toArray(): Signal.State {
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

    private confirmChange(value: number) {
        if (value === this.displayAspect) {
            return;
        }
        this.displayAspect = value;
        this.logChange();
    }

    private logChange() {
        webSocketServer.logChange({
            data: {
                [ENTITY_SIGNAL]: [this.toArray()],
            },
        });
    }
}


export namespace Signal {
    export interface State {
        displayAspect: number;
        requestedAspect: number;
        signalId: number;
        signalUId: string;
        name: string;
        type: Type;
        construction: Construction;
        lights: Light[];
        spec: {
            lastAutoBlock?: boolean;
        }
    }

    export type Construction = 'T' | 'K' | null;

    export type Type = 'entry' | 'exit' | 'path' | 'auto_block' | 'shunt';

    export type Light = 'HZ' | 'Z' | 'C' | 'B' | 'X' | 'DZ' | 'M';
}

