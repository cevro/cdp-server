import { LocoNetMessage } from 'app/schema/services/DateReceiver';
import { ABDir } from '@definitions/interfaces';
import { locoNetConnector } from 'app/serialConnector/';
import { Message } from '@definitions/messages';

export interface ABState {
    dir: ABDir;
    locoNetId: number;
}

export default class BiDirAB /*extends LocoNetObject<ABState>*/ {
    private dir: ABDir;

    constructor(data: { locoNetId: number }) {
        //   super(data.locoNetId, ENTITY_BI_DIR_AB);
        this.dir = 0;
    }

    public getDir(): ABDir {
        return this.dir;
    }

    public handlePatch(message: Message): void {
        if (message.data.hasOwnProperty('dir')) {
            return locoNetConnector.send({
                locoNetId: 1,// this.locoNetId,
                type: 'd',
                value: message.data.dir,
            });
        }
        //  super.handlePatch(message);
    }

    public handleLocoNetReceive(data: LocoNetMessage): void {
        switch (data.type) {
            case 'd':
                this.dir = (<ABDir>data.value);
                // this.sendState();
                return;
        }
        return;
    }

    public toObject(): ABState {
        return {
            dir: this.dir,
            locoNetId: 1,//this.locoNetId,
        }
    }
}
