import ModelRoute, { BackendRoute } from 'app/schema/models/modelRoute';
import AbstractService from 'app/schema/services/abstractService';
import { Connection } from 'mysql';
import SignalService from 'app/schema/services/signalService';
import SectorService from 'app/schema/services/sectorService';
import TurnoutService from 'app/schema/services/turnoutService';
import { BackendTurnout } from 'app/consts/interfaces/turnout';


export interface TrainRouteDefinition {
    id: number;
    name: string;
    sectorIds: string[];
    turnoutPositions: Array<[string, BackendTurnout.EndPosition]>;
    startSignalId: string;
    endSignalId: string | null;
    endSectorId: number;
    speed: BackendRoute.Speed;
    sufficientDistance: boolean;
    knotId?: number;
}

const routes: TrainRouteDefinition[] = [
    {
        id: 1001,
        name: '1L-L1',
        sectorIds: [
            'zst.pu.s.1LK_0',
            'zst.pu.s.1LK_1',
            'zst.pu.s.1LK_2',
            'zst.pu.s.1LK_3',
            /*1001,
            1002,
            1003,
            1004,
            1005,*/
        ],
        turnoutPositions: [
            ['zst.pu.t.2', 'S'],
            ['zst.pu.t.7', 'S'],
            ['zst.pu.t.9', 'S'],
            ['zst.pu.t.4', 'S'],
            ['zst.pu.t.5', 'S'],
        ],
        startSignalId: 'zst.pu.a.1L',
        endSignalId: 'zst.pu.a.L1',
        endSectorId: 1005,
        speed: null,
        sufficientDistance: true,
    },
    /*{
        name: '1L-L1-a1',
        sectorIds: [
            1001,
            1002,
            1003,
            1004,
            1005,
        ],
        pointPositions: [
            new TurnoutPosition(2, 1, [{id: 4, position: 1}]],
            new TurnoutPosition(7, 1, [{id: 5, position: 1}]],
            new TurnoutPosition(9,'S'],,
        ],
        startSignalId: 1,
        endSignalId: 3,
        endSectorId: 1005,
        speed: null,
    },*/
    {
        id: 1003,
        name: '1L-L3',
        sectorIds: [
            'zst.pu.s.1LK_0',
            'zst.pu.s.1LK_1',
            'zst.pu.s.1LK_2',
            'zst.pu.s.1LK_3',
            'zst.pu.s.3LK_0',
            'zst.pu.s.3',
            /*1  1001,
              1002,
              1003,
              1004,
              3001,
              3010,*/
        ],
        turnoutPositions: [
            ['zst.pu.t.2', 'S'],
            ['zst.pu.t.4', 'S'],
            ['zst.pu.t.7', 'S'],
            ['zst.pu.t.5', 'S'],
            ['zst.pu.t.9', 'D'],
            ['zst.pu.t.13', 'D'],
        ],
        startSignalId: 'zst.pu.a.1L',
        endSignalId: 'zst.pu.a.Lc3',
        endSectorId: 3010,
        speed: 40,
        sufficientDistance: true,
    },
    {
        id: 3003,
        name: '3-3a',
        sectorIds: [
            /* 3021,
             3110,*/
        ],
        turnoutPositions: [
            ['zst.pu.t.23', 'S'],
        ],
        startSignalId: 'zst.pu.a.Lc3',
        endSignalId: 'zst.pu.a.L3a',
        endSectorId: 3110,
        speed: 40,
        sufficientDistance: false,
    },
    {
        id: 3004,
        name: '3a-BE2',
        sectorIds: [
            /*1    1007,
                2008,
                2009,
                102,*/
        ],
        turnoutPositions: [
            ['zst.pu.t.33', 'D'],

            ['zst.pu.t.36', 'D'],
            ['zst.pu.t.41', 'D'],
            ['zst.pu.t.42', 'S'],
            ['zst.pu.t.40', 'S'],
            ['zst.pu.t.43', 'S'],
            ['zst.pu.t.44', 'S'],

        ],
        startSignalId: 'zst.pu.a.L3a',
        endSignalId: null,
        endSectorId: 102,
        speed: 40,
        sufficientDistance: true,
    },
    {
        id: 3005,
        name: '3a-BE1',
        sectorIds: [
            /*1 1007,
             1008,
             1009,
             1010,
             102,*/
        ],
        turnoutPositions: [
            ['zst.pu.t.33', 'D'],
            ['zst.pu.t.36', 'S'],
            ['zst.pu.t.41', 'S'],
            ['zst.pu.t.43', 'S'],
            ['zst.pu.t.44', 'S'],
        ],
        startSignalId: 'zst.pu.a.L3a',
        endSignalId: null,
        endSectorId: 102,
        speed: 40,
        sufficientDistance: true,
    },
    {
        id: 3503,
        name: '3a-3',
        sectorIds: [
            /*1  3021,
              3010,*/
        ],
        turnoutPositions: [
            ['zst.pu.t.23', 'S'],
        ],
        startSignalId: 'zst.pu.a.Sc3a',
        endSignalId: 'zst.pu.a.S3',
        endSectorId: 3010,
        speed: 40,
        sufficientDistance: false,
    },
];


export default class RouteService extends AbstractService<ModelRoute> {

    private routes: ModelRoute[];

    private readonly signalService: SignalService;
    private readonly sectorService: SectorService;
    private readonly serviceTurnout: TurnoutService;

    constructor(signalService: SignalService, sectorService: SectorService, serviceTurnout: TurnoutService) {
        super();
        this.sectorService = sectorService;
        this.signalService = signalService;
        this.serviceTurnout = serviceTurnout;
    }

    /*
    public handleMessageReceive(message: Message): void {
        if (message.entity !== 'route-finder') {
            return;
        }
        switch (message.action) {
            case 'find':
                return this.handeFindRoute(message);
        }
    }*/

    public findRoute(startSignalUId: string, endSignalUId: string): ModelRoute[] {
        return this.routes.filter((route) => {
            return (route.startSignal.getUId() === startSignalUId) && (route.endSignal.getUId());
        });
    }

    public loadSchema(connection: Connection): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.routes = routes.map((def) => {
                return new ModelRoute(
                    {
                        route_id: def.id,
                        route_uid: def.name,
                        name: def.name,
                        speed: def.speed,
                        sufficient_distance: def.sufficientDistance ? def.sufficientDistance : false,
                    },
                    def,
                    this.signalService.findByUId(def.startSignalId),
                    def.endSignalId ? this.signalService.findByUId(def.endSignalId) : null,
                    def.turnoutPositions.map(pos => {
                        return {turnout: this.serviceTurnout.findByUId(pos[0]), position: pos[1]};
                    }),
                    def.sectorIds.map(id => this.sectorService.findByUId(id)),
                    null,
                );
            });
            resolve();
        });
    }

    public getAll(): ModelRoute[] {
        return this.routes;
    }
}
