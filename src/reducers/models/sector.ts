import { ModelReducer } from 'app/reducers/models/modelReducer';
import { SECTOR_ACTIONS_PREFIX } from 'app/actions/models';
import ModelSector from 'app/schema/models/modelSector';

export class SectorReducer extends ModelReducer<ModelSector> {

    protected actionPrefix(): string {
        return SECTOR_ACTIONS_PREFIX;
    }
}
