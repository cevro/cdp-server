import AbstractModel from 'app/schema/models/abstractModel';
import SerialConnector from 'app/serialConnector';

export default class ModelAutoBlockSector extends AbstractModel<{
    active: boolean;
    error: number;
    sectorId: number;
    sectorUId: string;
}> {
    public readonly sectorId: number;
    public readonly sectorUId: string;

    public error: number;
    public state: number;
    public active: number;
    public blockCondition: number;

    constructor(data: any) {
        super();
        this.state = -1;
        this.error = -1;
        this.active = -1;
        this.blockCondition = -1;
    }

    public getUId(): string {
        return this.sectorUId;
    }

    public toArray(): any {
        return {
            active: this.active,
            error: this.error,
            sectorId: this.sectorId,
            sectorUId: this.sectorUId,
        };
    }

    /*
        public handleLocoNetReceive(data: LocoNetMessage): void {
            switch (data.type) {
                case 'e':
                    this.errorCode = data.value;
                    break;
                case 's':
                    this.state = data.value;
                    break;
                case 'a':
                    this.active = data.value;
                    //  this.sendState();
                    break;
                case 'c':
                    this.blockCondition = data.value;
                    //  this.sendState();
                    break;
            }
            // console.log(this);
        }*/

}
