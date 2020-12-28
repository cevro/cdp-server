import Sector from '../models/Sectors/Sector';
import {Message} from '@definitions/messages';
import {sectors} from 'app/data/sectors';
import LocoNetObjectsFactory from './LocoNetObjectsFactory';

class SectorsFactory extends LocoNetObjectsFactory<Message> {

    private readonly sectors: Sector[];

    constructor() {
        super();
        this.sectors = sectors.map(value => {
            return new Sector(value);
        });
    }

    public findById(id: number): Sector {
        for (const index in this.sectors) {
            if (this.sectors.hasOwnProperty(index)) {
                if (this.sectors[index].getLocoNetId() === id) {
                    return this.sectors[index];
                }
            }
        }
        throw new Error();
    }

    protected getObjects(): Sector[] {
        return this.sectors;
    }
}

export const sectorFactory = new SectorsFactory();
