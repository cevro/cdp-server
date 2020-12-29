import TurnoutPosition, { TurnoutPositionDef } from '../../../schema/models/turnoutPosition';

export interface TrainRouteDefinition {
    id: number;
    name: string;
    sectorIds: number[];
    turnoutPositions: TurnoutPositionDef[];
    startSignalId: number;
    endSignalId?: number;
    endSectorId: number;
    speed: number | null;
    sufficientDistance?: boolean;
    knotId?: number;
}

const routes1L: TrainRouteDefinition[] = [
    {
        id: 1001,
        name: '1L-L1',
        sectorIds: [
            1001,
            1002,
            1003,
            1004,
            1005,
        ],
        turnoutPositions: [
            TurnoutPosition.create(2, 1),
            TurnoutPosition.create(2, 1),
            TurnoutPosition.create(7, 1),
            TurnoutPosition.create(9, 1),
            TurnoutPosition.create(4, 1),
            TurnoutPosition.create(5, 1),
        ],
        startSignalId: 1,
        endSignalId: 3,
        endSectorId: 1005,
        speed: null,
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
            new TurnoutPosition(2, 1, [{id: 4, position: 1}]),
            new TurnoutPosition(7, 1, [{id: 5, position: 1}]),
            new TurnoutPosition(9, 1),
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
            1001,
            1002,
            1003,
            1004,
            3001,
            3010,
        ],
        turnoutPositions: [
            TurnoutPosition.create(2, 1),
            TurnoutPosition.create(4, 1),
            TurnoutPosition.create(7, 1),
            TurnoutPosition.create(5, 1),
            TurnoutPosition.create(9, -1),
            TurnoutPosition.create(13, 1),
        ],
        startSignalId: 1,
        endSignalId: 106,
        endSectorId: 3010,
        speed: 40,
    },
];

export const routes3L: TrainRouteDefinition[] = [
    {
        id: 3003,
        name: '3-3a',
        sectorIds: [
            3021,
            3110,
        ],
        turnoutPositions: [
            TurnoutPosition.create(23, 1),
        ],
        startSignalId: 106,
        endSignalId: 5,
        endSectorId: 3110,
        speed: 40,
        sufficientDistance: false,
    },
    {
        id: 3004,
        name: '3a-BE2',
        sectorIds: [
            1007,
            2008,
            2009,
            102,
        ],
        turnoutPositions: [
            TurnoutPosition.create(33, -1),

            TurnoutPosition.create(36, -1),
            TurnoutPosition.create(41, -1),

            TurnoutPosition.create(42, 1),
            TurnoutPosition.create(40, 1),
            TurnoutPosition.create(43, 1),
            TurnoutPosition.create(44, 1),

        ],
        startSignalId: 5,
        endSignalId: null,
        endSectorId: 102,
        speed: 40,
        sufficientDistance: true,
    },
    {
        id: 3005,
        name: '3a-BE1',
        sectorIds: [
            1007,
            1008,
            1009,
            1010,
            102,
        ],
        turnoutPositions: [
            TurnoutPosition.create(33, -1),
            TurnoutPosition.create(36, 1),
            TurnoutPosition.create(41, 1),
            TurnoutPosition.create(43, 1),
            TurnoutPosition.create(44, 1),
        ],
        startSignalId: 5,
        endSignalId: null,
        endSectorId: 102,
        speed: 40,
        sufficientDistance: true,
    },
];

export const routes3S: TrainRouteDefinition[] = [
    {
        id: 3503,
        name: '3a-3',
        sectorIds: [
            3021,
            3010,
        ],
        turnoutPositions: [
            TurnoutPosition.create(23, 1),
        ],
        startSignalId: 24,
        endSignalId: 28,
        endSectorId: 3010,
        speed: 40,
        sufficientDistance: false,
    },
];

export const routes: TrainRouteDefinition[] = [
    ...routes1L,
    ...routes3L,
    ...routes3S,
];
