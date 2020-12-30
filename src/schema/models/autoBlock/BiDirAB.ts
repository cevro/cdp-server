import { ABDir } from '@definitions/interfaces';

export interface ABState {
    dir: ABDir;
    locoNetId: number;
}

export default class BiDirAB /*extends LocoNetObject<ABState>*/ {
    private readonly dir: ABDir;

    constructor(data: { locoNetId: number }) {
        //   super(data.locoNetId, ENTITY_BI_DIR_AB);
        this.dir = 0;
    }

    public getDir(): ABDir {
        return this.dir;
    }
}
