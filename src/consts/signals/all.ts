import {
    SignalDefinition,
    SignalLight,
} from './interfaces';
import {signalTypes} from './signalTypes';

interface SignalBuffer {
    [key: string]: SignalDefinition;
}

const ABLights: SignalLight[] = ['HZ', 'Z', 'C'];

const ABDef: { type: number; lights: SignalLight[]; } = {
    type: signalTypes.TYPE_AB,
    lights: ABLights,
};

const entrySignals: SignalBuffer = {
    'zst.pu.1L': {
        name: '1L',
        locoNetId: 1,
        construction: 'K',
        type: signalTypes.TYPE_ENTRY,
        lights: ['HZ', 'Z', 'C', 'B', 'DZ'],
    },
    'zst.pu.2L': {
        name: '2L',
        locoNetId: 2,
        construction: 'K',
        type: signalTypes.TYPE_ENTRY,
        lights: ['HZ', 'Z', 'C', 'B', 'DZ'],
    },
    'zst.pu.1S': {
        name: '1S',
        locoNetId: 517,
        type: signalTypes.TYPE_ENTRY,
        lights: ['HZ', 'Z', 'C', 'B', 'X', 'DZ'],
    },

    'zst.pu.2S': {
        name: '2S',
        locoNetId: 21,
        type: signalTypes.TYPE_ENTRY,
        lights: ['HZ', 'Z', 'C', 'B', 'X', 'DZ'],
    },

    'zst.pu.1BS': {
        name: '1BS',
        locoNetId: 22,
        type: signalTypes.TYPE_ENTRY,
        lights: ['HZ', 'Z', 'C', 'B', 'X', 'DZ'],
    },

    'zst.pu.2BS': {
        name: '2BS',
        locoNetId: 23,
        type: signalTypes.TYPE_ENTRY,
        lights: ['HZ', 'Z', 'C', 'B', 'X', 'DZ'],
    },
};

const exitSignalsL: SignalBuffer = {
    'zst.pu.L1': {
        name: 'L1',
        locoNetId: 3,
        type: signalTypes.TYPE_EXIT,

        lights: ['HZ', 'Z', 'C', 'B', 'DZ'],
    },

    'zst.pu.L2': {
        name: 'L2',
        locoNetId: 4,
        type: signalTypes.TYPE_EXIT,

        lights: ['HZ', 'Z', 'C', 'B', 'DZ'],
    },
    'zst.pu.L3a': {
        name: 'L3a',
        locoNetId: 5,
        type: signalTypes.TYPE_EXIT,

        lights: ['Z', 'C', 'B', 'DZ'],
    },

    'zst.pu.L4': {
        name: 'L4',
        locoNetId: 6,
        type: signalTypes.TYPE_EXIT,

        lights: ['HZ', 'Z', 'C', 'B', 'DZ'],
    },

    'zst.pu.L6': {
        name: 'L6',
        locoNetId: 7,
        type: signalTypes.TYPE_EXIT,

        lights: ['HZ', 'Z', 'C', 'B', 'DZ'],
    },

    'zst.pu.L8': {
        name: 'L8',
        locoNetId: 8,
        type: signalTypes.TYPE_EXIT,

        lights: ['HZ', 'Z', 'C', 'B', 'DZ'],
    },

    'zst.pu.L10': {
        name: 'L10',
        locoNetId: 9,
        type: signalTypes.TYPE_EXIT,

        lights: ['HZ', 'Z', 'C', 'B', 'DZ'],
    },

    'zst.pu.L12': {
        name: 'L12',
        locoNetId: 10,
        type: signalTypes.TYPE_EXIT,

        lights: ['HZ', 'Z', 'C', 'B', 'DZ'],
    },

    'zst.pu.L14a': {
        name: 'L14a',
        locoNetId: 11,
        type: signalTypes.TYPE_EXIT,

        lights: ['HZ', 'Z', 'C', 'B', 'DZ'],
    },
};
const exitSignalsS: SignalBuffer = {
    'zst.pu.S1': {
        name: 'S1',
        locoNetId: 26,
        type: signalTypes.TYPE_EXIT,

        lights: ['HZ', 'Z', 'C', 'B', 'DZ'],
    },

    'zst.pu.S2': {
        name: 'S2',
        locoNetId: 27,
        type: signalTypes.TYPE_EXIT,

        lights: ['HZ', 'Z', 'C', 'B', 'DZ'],
    },

    'zst.pu.S3': {
        name: 'S3',
        locoNetId: 28,
        type: signalTypes.TYPE_EXIT,

        lights: ['HZ', 'Z', 'C', 'B', 'DZ'],
    },

    'zst.pu.S4': {
        name: 'S4',
        locoNetId: 29,
        type: signalTypes.TYPE_EXIT,

        lights: ['HZ', 'Z', 'C', 'B', 'DZ'],
    },

    'zst.pu.S6': {
        name: 'S6',
        locoNetId: 30,
        type: signalTypes.TYPE_EXIT,

        lights: ['HZ', 'Z', 'C', 'B', 'DZ'],
    },

    'zst.pu.S8': {
        name: 'S8',
        locoNetId: 31,
        type: signalTypes.TYPE_EXIT,

        lights: ['HZ', 'Z', 'C', 'B', 'DZ'],
    },

    'zst.pu.S10': {
        name: 'S10',
        locoNetId: 32,
        type: signalTypes.TYPE_EXIT,

        lights: ['HZ', 'Z', 'C', 'B', 'DZ'],
    },

    'zst.pu.S12': {
        name: 'S12',
        locoNetId: 33,
        type: signalTypes.TYPE_EXIT,

        lights: ['HZ', 'Z', 'C', 'B', 'DZ'],
    },

    'zst.pu.S14': {
        name: 'S14',
        locoNetId: 34,
        type: signalTypes.TYPE_EXIT,

        lights: ['HZ', 'Z', 'C', 'B', 'DZ'],
    },

    'zst.pu.S16': {
        name: 'S16',
        locoNetId: 35,
        type: signalTypes.TYPE_EXIT,

        lights: ['HZ', 'Z', 'C', 'B', 'DZ'],
    },
};
const pathSignalsL: SignalBuffer = {
    'zst.pu.Lc3': {
        name: 'Lc3',
        locoNetId: 106,
        type: signalTypes.TYPE_PATH,

        lights: ['HZ', 'C', 'B', 'X', 'DZ'],
    },
    'zst.pu.Lc14': {
        name: 'Lc14',
        locoNetId: 12,
        type: signalTypes.TYPE_PATH,

        lights: ['HZ', 'C', 'B', 'X', 'DZ'],
    },

    'zst.pu.Lc16': {
        name: 'Lc16',
        locoNetId: 13,
        type: signalTypes.TYPE_PATH,

        lights: ['HZ', 'C', 'B', 'X', 'DZ'],
    },
};
const pathSignalsS: SignalBuffer = {
    'zst.pu.Sc3a': {
        name: 'Sc3a',
        locoNetId: 24,
        type: signalTypes.TYPE_PATH,

        lights: ['HZ', 'C', 'B', 'X', 'DZ'],
    },

    'zst.pu.Sc14a': {
        name: 'Sc14a',
        locoNetId: 25,
        type: signalTypes.TYPE_PATH,

        lights: ['HZ', 'C', 'B', 'X', 'DZ'],
    },
};

const shiftSignals: SignalBuffer = {
    'zst.pu.Se1': {
        name: 'Se1',
        locoNetId: 2001,
        construction: 'T',
        type: signalTypes.TYPE_SHUNT,
        lights: ['M', 'B'],
    },
    'zst.pu.Se2': {
        name: 'Se2',
        locoNetId: 2002,
        construction: 'T',
        type: signalTypes.TYPE_SHUNT,
        lights: ['M', 'B'],
    },
    'zst.pu.Se3': {
        name: 'Se3',
        locoNetId: 2003,
        type: signalTypes.TYPE_SHUNT,
        lights: ['M', 'B'],
    },
    'zst.pu.Se4': {
        name: 'Se4',
        locoNetId: 2004,
        type: signalTypes.TYPE_SHUNT,
        lights: ['M', 'B'],
    },
    'zst.pu.Se5': {
        name: 'Se5',
        locoNetId: 2005,
        type: signalTypes.TYPE_SHUNT,
        lights: ['M', 'B'],
    },
    'zst.pu.Se6': {
        name: 'Se6',
        locoNetId: 2006,
        type: signalTypes.TYPE_SHUNT,
        lights: ['M', 'B'],
    },
    'zst.pu.Se7': {
        name: 'Se7',
        locoNetId: 2007,
        construction: 'T',
        type: signalTypes.TYPE_SHUNT,
        lights: ['M', 'B'],
    },
    'zst.pu.Se8': {
        name: 'Se8',
        locoNetId: 2008,
        construction: 'T',
        type: signalTypes.TYPE_SHUNT,
        lights: ['M', 'B'],
    },
    'zst.pu.Se9': {
        name: 'Se9',
        locoNetId: 2009,
        type: signalTypes.TYPE_SHUNT,
        lights: ['M', 'B'],
    },
    'zst.pu.Se11': {
        name: 'Se11',
        locoNetId: 2011,
        type: signalTypes.TYPE_SHUNT,
        lights: ['M', 'B'],
    },
    'zst.pu.Se19': {
        name: 'Se19',
        locoNetId: 2019,
        type: signalTypes.TYPE_SHUNT,
        lights: ['M', 'B'],
    },
    'zst.pu.Se20': {
        name: 'Se20',
        locoNetId: 2020,
        construction: 'T',
        type: signalTypes.TYPE_SHUNT,
        lights: ['M', 'B'],
    },
    'zst.pu.Se102': {
        name: 'Se102',
        locoNetId: 2102,
        type: signalTypes.TYPE_SHUNT,
        lights: ['M', 'B'],
    },
    'zst.pu.Se21': {
        name: 'Se21',
        locoNetId: 2021,
        construction: 'T',
        type: signalTypes.TYPE_SHUNT,
        lights: ['M', 'B'],
    },
    'zst.pu.Se22': {
        name: 'Se22',
        locoNetId: 2022,
        construction: 'T',
        type: signalTypes.TYPE_SHUNT,
        lights: ['M', 'B'],
    },
    'zst.pu.Se23': {
        name: 'Se23',
        locoNetId: 2023,
        construction: 'T',
        type: signalTypes.TYPE_SHUNT,
        lights: ['M', 'B'],
    },
    'zst.pu.Se24': {
        name: 'Se24',
        locoNetId: 2024,
        construction: 'T',
        type: signalTypes.TYPE_SHUNT,
        lights: ['M', 'B'],
    },
    'zst.pu.Se25': {
        name: 'Se25',
        locoNetId: 2025,
        construction: 'T',
        type: signalTypes.TYPE_SHUNT,
        lights: ['M', 'B'],
    },
    'zst.pu.Se26': {
        name: 'Se26',
        locoNetId: 2026,
        construction: 'T',
        type: signalTypes.TYPE_SHUNT,
        lights: ['M', 'B'],
    },
    'zst.pu.Se27': {
        name: 'Se27',
        locoNetId: 2027,
        construction: 'T',
        type: signalTypes.TYPE_SHUNT,
        lights: ['M', 'B'],
    },
    'zst.pu.Se29': {
        name: 'Se29',
        locoNetId: 2029,
        construction: 'T',
        type: signalTypes.TYPE_SHUNT,
        lights: ['M', 'B'],
    },
    'zst.pu.Se34': {
        name: 'Se34',
        locoNetId: 2034,
        construction: 'T',
        type: signalTypes.TYPE_SHUNT,
        lights: ['M', 'B'],
    },
    'zst.pu.Se35': {
        name: 'Se35',
        locoNetId: 2035,
        construction: 'T',
        type: signalTypes.TYPE_SHUNT,
        lights: ['M', 'B'],
    },
    'zst.pu.Se36': {
        name: 'Se36',
        locoNetId: 2036,
        construction: 'T',
        type: signalTypes.TYPE_SHUNT,
        lights: ['M', 'B'],
    },
    'zst.pu.Se37': {
        name: 'Se37',
        locoNetId: 2037,
        construction: 'T',
        type: signalTypes.TYPE_SHUNT,
        lights: ['M', 'B'],
    },
    'zst.pu.Se38': {
        name: 'Se38',
        locoNetId: 2038,
        construction: 'T',
        type: signalTypes.TYPE_SHUNT,
        lights: ['M', 'B'],
    },
    'zst.pu.Se39': {
        name: 'Se39',
        locoNetId: 2039,
        construction: 'T',
        type: signalTypes.TYPE_SHUNT,
        lights: ['M', 'B'],
    },
    'zst.pu.Se40': {
        name: 'Se40',
        locoNetId: 2040,
        construction: 'T',
        type: signalTypes.TYPE_SHUNT,
        lights: ['M', 'B'],
    },
};

const signalAB_LM: SignalBuffer = {
    'ab.pu-lpm.1-22': {
        name: '1-22',
        locoNetId: 515,
        ...ABDef,
        spec: 'last-AB',
    },
    'ab.pu-lpm.2-22': {
        name: '2-22',
        locoNetId: 514,
        ...ABDef,
        spec: 'last-AB',
    },

    'ab.pu-lpm.1-34': {
        name: '1-34',
        locoNetId: 513,
        ...ABDef,
    },
    'ab.pu-lpm.2-34': {
        name: '2-34',
        locoNetId: 512,
        ...ABDef,
    },

    'ab.pu-lpm.1-50': {
        name: '1-50',
        locoNetId: 511,
        ...ABDef,
    },
    'ab.pu-lpm.2-50': {
        name: '2-50',
        locoNetId: 510,
        ...ABDef,
    },

    'ab.pu-lpm.1-64': {
        name: '1-64',
        locoNetId: 509,
        ...ABDef,
    },
    'ab.pu-lpm.2-64': {
        name: '2-64',
        locoNetId: 508,
        ...ABDef,
    },

    'ab.pu-lpm.1-76': {
        name: '1-76',
        locoNetId: 507,
        ...ABDef,
    },
    'ab.pu-lpm.2-76': {
        name: '2-76',
        locoNetId: 506,
        ...ABDef,

    },

    'ab.pu-lpm.1-90': {
        name: '1-90',
        locoNetId: 505,
        ...ABDef,

    },
    'ab.pu-lpm.2-90': {
        name: '2-90',
        locoNetId: 504,
        ...ABDef,
    },

    'ab.pu-lpm.1-102': {
        name: '1-102',
        locoNetId: 503,
        ...ABDef,
    },
    'ab.pu-lpm.2-102': {
        name: '2-102',
        locoNetId: 502,
        ...ABDef,
    },

    'ab.pu-lpm.1-116': {
        name: '1-116',
        locoNetId: 501,
        ...ABDef,
    },
    'ab.pu-lpm.2-116': {
        name: '2-116',
        locoNetId: 500,
        ...ABDef,
    },

    'ab.pu-lpm.1-15': {
        name: '1-15',
        locoNetId: 519,
        ...ABDef,
    },
    'ab.pu-lpm.2-15': {
        name: '2-15',
        locoNetId: 518,
        ...ABDef,
    },

    'ab.pu-lpm.1-29': {
        name: '1-29',
        locoNetId: 521,
        ...ABDef,
    },
    'ab.pu-lpm.2-29': {
        name: '2-29',
        locoNetId: 520,
        ...ABDef,
    },

    'ab.pu-lpm.1-39': {
        name: '1-39',
        locoNetId: 523,
        ...ABDef,
    },
    'ab.pu-lpm.2-39': {
        name: '2-39',
        locoNetId: 522,
        ...ABDef,
    },

    'ab.pu-lpm.1-51': {
        name: '1-51',
        locoNetId: 525,
        ...ABDef,

    },
    'ab.pu-lpm.2-51': {
        name: '2-51',
        locoNetId: 524,
        ...ABDef,
    },

    'ab.pu-lpm.1-65': {
        name: '1-65',
        locoNetId: 527,
        ...ABDef,
    },
    'ab.pu-lpm.2-65': {
        name: '2-65',
        locoNetId: 526,
        ...ABDef,
    },

    'ab.pu-lpm.1-75': {
        name: '1-75',
        locoNetId: 529,
        ...ABDef,
    },
    'ab.pu-lpm.2-75': {
        name: '2-75',
        locoNetId: 528,
        ...ABDef,
    },

    'ab.pu-lpm.1-87': {
        name: '1-87',
        locoNetId: 531,
        ...ABDef,
    },
    'ab.pu-lpm.2-87': {
        name: '2-87',
        locoNetId: 530,
        ...ABDef,
    },

    'ab.pu-lpm.1-101': {
        name: '1-101',
        locoNetId: 533,
        ...ABDef,
    },
    'ab.pu-lpm.2-101': {
        name: '2-101',
        locoNetId: 532,
        ...ABDef,
    },

    'ab.pu-lpm.1-115': {
        name: '1-115',
        locoNetId: 535,
        ...ABDef,
        spec: 'last-AB',
    },
    'ab.pu-lpm.2-115': {
        name: '2-115',
        locoNetId: 534,
        ...ABDef,
        spec: 'last-AB',
    },
};

const signals: SignalBuffer = {
    ...entrySignals,
    ...signalAB_LM,
    ...exitSignalsL,
    ...exitSignalsS,
    ...pathSignalsL,
    ...pathSignalsS,
    ...shiftSignals,
    // ...signalAutoblokPB,
};

export function getSignalDefinition(key: string): SignalDefinition {
    return signals[key];
}

