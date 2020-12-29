import ABSector from '../models/autoBlock/autoBlockSector';
import { ABSectors } from '@definitions/ABSectors/ABSectors';
import { LocoNetDefinition } from '@definitions/interfaces';

class ABSectorsFactory /*extends LocoNetObjectsFactory<Message, ABSectorState> */ {
    private readonly ABSectors: ABSector[];

    constructor() {
        // super();
        this.ABSectors = ABSectors.map((value: LocoNetDefinition) => {
            return new ABSector(value);
        });
    }

    protected getObjects(): ABSector[] {
        return this.ABSectors;
    }
}

export const autoBlockSectorFactory = new ABSectorsFactory();
