const exitSignalsL = {
    'zst.pu.L1': {
        name: 'L1',
        locoNetId: 3,
        type: 'exit',

        lights: ['HZ', 'Z', 'C', 'B', 'DZ'],
    },

    'zst.pu.L2': {
        name: 'L2',
        locoNetId: 4,
        type: 'exit',

        lights: ['HZ', 'Z', 'C', 'B', 'DZ'],
    },
    'zst.pu.L3a': {
        name: 'L3a',
        locoNetId: 5,
        type: 'exit',

        lights: ['Z', 'C', 'B', 'DZ'],
    },

    'zst.pu.L4': {
        name: 'L4',
        locoNetId: 6,
        type: 'exit',

        lights: ['HZ', 'Z', 'C', 'B', 'DZ'],
    },

    'zst.pu.L6': {
        name: 'L6',
        locoNetId: 7,
        type: 'exit',

        lights: ['HZ', 'Z', 'C', 'B', 'DZ'],
    },

    'zst.pu.L8': {
        name: 'L8',
        locoNetId: 8,
        type: 'exit',

        lights: ['HZ', 'Z', 'C', 'B', 'DZ'],
    },

    'zst.pu.L10': {
        name: 'L10',
        locoNetId: 9,
        type: 'exit',

        lights: ['HZ', 'Z', 'C', 'B', 'DZ'],
    },

    'zst.pu.L12': {
        name: 'L12',
        locoNetId: 10,
        type: 'exit',

        lights: ['HZ', 'Z', 'C', 'B', 'DZ'],
    },

    'zst.pu.L14a': {
        name: 'L14a',
        locoNetId: 11,
        type: 'exit',

        lights: ['HZ', 'Z', 'C', 'B', 'DZ'],
    },
};
const exitSignalsS = {
    'zst.pu.S1': {
        name: 'S1',
        locoNetId: 26,
        type: 'exit',

        lights: ['HZ', 'Z', 'C', 'B', 'DZ'],
    },

    'zst.pu.S2': {
        name: 'S2',
        locoNetId: 27,
        type: 'exit',

        lights: ['HZ', 'Z', 'C', 'B', 'DZ'],
    },

    'zst.pu.S3': {
        name: 'S3',
        locoNetId: 28,
        type: 'exit',

        lights: ['HZ', 'Z', 'C', 'B', 'DZ'],
    },

    'zst.pu.S4': {
        name: 'S4',
        locoNetId: 29,
        type: 'exit',
        lights: ['HZ', 'Z', 'C', 'B', 'DZ'],
    },

    'zst.pu.S6': {
        name: 'S6',
        locoNetId: 30,
        type: 'exit',
        lights: ['HZ', 'Z', 'C', 'B', 'DZ'],
    },

    'zst.pu.S8': {
        name: 'S8',
        locoNetId: 31,
        type: 'exit',
        lights: ['HZ', 'Z', 'C', 'B', 'DZ'],
    },

    'zst.pu.S10': {
        name: 'S10',
        locoNetId: 32,
        type: 'exit',
        lights: ['HZ', 'Z', 'C', 'B', 'DZ'],
    },

    'zst.pu.S12': {
        name: 'S12',
        locoNetId: 33,
        type: 'exit',
        lights: ['HZ', 'Z', 'C', 'B', 'DZ'],
    },

    'zst.pu.S14': {
        name: 'S14',
        locoNetId: 34,
        type: 'exit',
        lights: ['HZ', 'Z', 'C', 'B', 'DZ'],
    },

    'zst.pu.S16': {
        name: 'S16',
        locoNetId: 35,
        type: 'exit',
        lights: ['HZ', 'Z', 'C', 'B', 'DZ'],
    },
};

export default {...exitSignalsL, exitSignalsS};
