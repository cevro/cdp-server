import ModelAutoBlockSector from 'app/schema/autoBlock/modelAutoBlockSector';

const autoBlockSectors: any[] = [
    {locoNetId: 700},
    {locoNetId: 701},
    {locoNetId: 702},
    {locoNetId: 703},
    {locoNetId: 704},

    {locoNetId: 705},
    {locoNetId: 706},
    {locoNetId: 707},
    {locoNetId: 708},
    {locoNetId: 709},

    {locoNetId: 710},
    {locoNetId: 711},
    {locoNetId: 712},
    {locoNetId: 713},
    {locoNetId: 714},
    {locoNetId: 715},
    {locoNetId: 716},
    {locoNetId: 717},

    {locoNetId: 720},
    {locoNetId: 721},
    {locoNetId: 722},
    {locoNetId: 723},
    {locoNetId: 724},
    {locoNetId: 725},
    {locoNetId: 726},
    {locoNetId: 727},
    {locoNetId: 728},
    {locoNetId: 729},

    {locoNetId: 730},
    {locoNetId: 731},
    {locoNetId: 732},
    {locoNetId: 733},
    {locoNetId: 734},
    {locoNetId: 735},
    {locoNetId: 736},
    {locoNetId: 737},
    {locoNetId: 738},
    {locoNetId: 739},

];
export default class ServiceAutoBlockSector /*extends LocoNetObjectsFactory<Message, ABSectorState> */ {
    private readonly autoBlockSectors: ModelAutoBlockSector[];

    constructor() {
        // super();
        this.autoBlockSectors = autoBlockSectors.map((value: any) => {
            return new ModelAutoBlockSector(null, value);
        });
    }

    protected getObjects(): ModelAutoBlockSector[] {
        return this.autoBlockSectors;
    }
}
