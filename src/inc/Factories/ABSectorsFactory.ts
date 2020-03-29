import ABSector from '../objects/AB/ABSector';
import {ABSectors} from '@definitions/ABSectors/ABSectors';
import LocoNetObjectsFactory from './LocoNetObjectsFactory';
import LocoNetObject from '../objects/LocoNetObject';
import {LocoNetDefinition} from '@definitions/interfaces';
import {
    ClientToServerMessages,
    StateUpdateData,
} from '@definitions/messages/ABSector';

class ABSectorsFactory extends LocoNetObjectsFactory<ClientToServerMessages, StateUpdateData> {
    private readonly ABSectors: ABSector[];

    constructor() {
        super();
        this.ABSectors = ABSectors.map((value: LocoNetDefinition) => {
            return new ABSector(value);
        });
    }

    protected getObjects(): LocoNetObject<ClientToServerMessages, StateUpdateData>[] {
        return this.ABSectors;
    }
}

export const autoBlockSectorFactory = new ABSectorsFactory();
