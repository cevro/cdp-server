import {LocoNetMessage} from '../../Factories/DateReceiver';
import {ABDir} from '@definitions/interfaces';
import {locoNetConnector} from '../../SerialConnector/SerialConnector';
import {Message} from '@definitions/messages';
import {ENTITY_BI_DIR_AB} from '@definitions/entity';
import LocoNetObject from '../LocoNetObject';

export interface ABState {
    dir: ABDir;
    locoNetId: number;
}

export default class BiDirAB extends LocoNetObject<Message, ABState> {
    private dir: ABDir;

    constructor(data: { locoNetId: number }) {
        super(data.locoNetId, ENTITY_BI_DIR_AB);
        this.dir = 0;
    }

    public getDir(): ABDir {
        return this.dir;
    }

    handlePatch(message: Message): void {
        if (message.data.hasOwnProperty('dir')) {
            return locoNetConnector.send({
                locoNetId: this.locoNetId,
                type: 'd',
                value: message.data.dir,
            });
        }
        super.handlePatch(message);
    }

    public handleLocoNetReceive(data: LocoNetMessage): void {
        switch (data.type) {
            case 'd':
                this.dir = (<ABDir>data.value);
                this.sendState();
                return;
        }
        return;
    }

    public toObject(): ABState {
        return {
            dir: this.dir,
            locoNetId: this.locoNetId,
        }
    }
}
