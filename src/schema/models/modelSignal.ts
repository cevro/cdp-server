import AbstractModel from 'app/schema/models/abstractModel';
import { Aspect, BackendSignal } from 'app/consts/interfaces/signal';
import { SerialMessage } from 'app/serialConnector';
import AspectStrategy from 'app/routes/aspectStrategy';
import { Actions } from 'app/actions';

interface Row {
    signal_id: number;
    signal_uid: string;
    name: string;
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

    private _displayedAspect: number = Aspect.UNDEFINED;
    private _requestedAspect: number | null = null;

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
        this.getContainer().emit(Actions.Signal.MODEL_CREATED, this);
        this.getContainer().on(Actions.Serial.MESSAGE_RECEIVE, (message: SerialMessage) => {
            if (message.uId !== this.getUId()) {
                return;
            }
            switch (message.type) {
                case 'a':
                    this.displayedAspect = message.value;
            }

        });
    }

    public get displayedAspect(): number {
        return this._displayedAspect;
    }

    public get requestedAspect(): number | null {
        return this._requestedAspect;
    }

    public set displayedAspect(aspect: number) {
        if (this.displayedAspect === aspect) {
            return;
        }

        if (this.requestedAspect !== null && this.requestedAspect !== aspect) {
            // this.serial.send(this.toSerialMessage(aspect));
        }
        this._requestedAspect = null;
        this._displayedAspect = aspect;
        this.getContainer().emit(Actions.Signal.ASPECT_CHANGED, this);
    }

    public set requestedAspect(aspect: number) {
        this._requestedAspect = AspectStrategy.findAllowedSignal(this, aspect);
        this.getContainer().emit(Actions.Serial.MESSAGE_SEND, this.toSerialMessage(aspect));
        this.getContainer().emit(Actions.Signal.ASPECT_REQUESTED, this);
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

    private toSerialMessage(aspect: number): SerialMessage {
        return {
            uId: this.getUId(),
            type: 'a',
            value: aspect,
        };
    }
}
