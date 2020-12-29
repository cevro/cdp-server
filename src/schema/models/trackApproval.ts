import {
    ABRequestedDir,
} from '@definitions/interfaces';
import { Message } from '@definitions/messages';
import { LocoNetMessage, LocoNetReceiver } from 'app/schema/services/DateReceiver';
import BiDirAB from 'app/schema/models/autoBlock/BiDirAB';

export default class TrackApproval implements LocoNetReceiver/*, HttpReceiver<Message<any>>*/ {

    private readonly locoNetId: number;
    private biDirAB: BiDirAB;
    private readonly dir: ABRequestedDir;
    private locked: boolean;
    private readonly ABId: number;

    constructor(id: number, ABId: number, dir: ABRequestedDir) {
        // super();
        this.locoNetId = id;
        this.dir = dir;
        this.ABId = ABId;
        this.locked = false;
    }

    public check(): void {
        if (this.biDirAB.getDir() !== this.dir) {
            throw Error('AutoBlock on oposite direction');
        }
    }

    public handleLocoNetReceive(data: LocoNetMessage) {
        switch (data.type) {
            case 'l':
                this.locked = true;
        }
    }

    public handleMessageReceive(message: Message) {
        /*  if (message.id !== this.locoNetId) {
              return;
          }

          switch (message.action) {
              case 'unlock':
                  locoNetConnector.send({
                      locoNetId: this.ABId,
                      type: 'l',
                      value: 0,
                  });
                  break;
              case 'lock':
                  locoNetConnector.send({
                      locoNetId: this.ABId,
                      type: 'l',
                      value: 1,
                  });
                  break;
          }*/
    }

    public lock(id: number) {
        this.locked = true;
        //   this.sendState();
    }

    public unlock(id: number) {
        if (this.locked) {
            this.locked = false;
        }
    }

    public getEntityName() {
        return '';
    }

    public getLocoNetId() {
        return this.locoNetId;
    }

    public dumpData() {
        return {};
    }

}
