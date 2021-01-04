import AbstractModel from 'app/schema/models/abstractModel';
import { Aspect, BackendSignal } from 'app/consts/interfaces/signal';

interface Row {
    signal_id: number;
    signal_uid: string;
    name: string;
    loconet_id: number;
    type: BackendSignal.Type;
    construction: BackendSignal.Construction;
    last_auto_block: boolean;
    lights: string;
}

export default class ModelSignal extends AbstractModel<BackendSignal.Definition, Row> {

    public readonly signalId: number;
    public readonly signalUId: string;
    public readonly name: string;
    public readonly type: BackendSignal.Type;
    public readonly construction: BackendSignal.Construction;
    public readonly lights: BackendSignal.Light[];
    public readonly spec: {
        lastAutoBlock: boolean;
    };
    private displayedAspect: number = Aspect.UNDEFINED;
    private requestedAspect: number | null = null;

    public constructor(row: Row) {
        super();
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
    }

    public toArray() {
        return {
            signalId: this.signalId,
            signalUId: this.signalUId,
            name: this.name,
            type: this.type,
            construction: this.construction,
            lights: this.lights,
            spec: this.spec,
            requestedAspect: this.requestedAspect,
            displayedAspect: this.displayedAspect,
        };
    }

    public getUId(): string {
        return this.signalUId;
    }

    public getDisplayedAspect(): number {
        return this.displayedAspect;
    }

    public getRequestedAspect(): number | null {
        return this.requestedAspect;
    }

    public setDisplayedAspect(aspect: number): void {
        this.displayedAspect = aspect;
    }

    public setRequestedAspect(aspect: number | null): void {
        this.requestedAspect = aspect;
    }
}
