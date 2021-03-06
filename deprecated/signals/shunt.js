"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const signalTypes_1 = require("app/consts/signals/signalTypes");
const shuntSignals = {
    'zst.pu.Se1': {
        name: 'Se1',
        locoNetId: 2001,
        construction: 'T',
        type: signalTypes_1.signalTypes.TYPE_SHUNT,
        lights: ['M', 'B'],
    },
    'zst.pu.Se2': {
        name: 'Se2',
        locoNetId: 2002,
        construction: 'T',
        type: signalTypes_1.signalTypes.TYPE_SHUNT,
        lights: ['M', 'B'],
    },
    'zst.pu.Se3': {
        name: 'Se3',
        locoNetId: 2003,
        type: signalTypes_1.signalTypes.TYPE_SHUNT,
        lights: ['M', 'B'],
    },
    'zst.pu.Se4': {
        name: 'Se4',
        locoNetId: 2004,
        type: signalTypes_1.signalTypes.TYPE_SHUNT,
        lights: ['M', 'B'],
    },
    'zst.pu.Se5': {
        name: 'Se5',
        locoNetId: 2005,
        type: signalTypes_1.signalTypes.TYPE_SHUNT,
        lights: ['M', 'B'],
    },
    'zst.pu.Se6': {
        name: 'Se6',
        locoNetId: 2006,
        type: signalTypes_1.signalTypes.TYPE_SHUNT,
        lights: ['M', 'B'],
    },
    'zst.pu.Se7': {
        name: 'Se7',
        locoNetId: 2007,
        construction: 'T',
        type: signalTypes_1.signalTypes.TYPE_SHUNT,
        lights: ['M', 'B'],
    },
    'zst.pu.Se8': {
        name: 'Se8',
        locoNetId: 2008,
        construction: 'T',
        type: signalTypes_1.signalTypes.TYPE_SHUNT,
        lights: ['M', 'B'],
    },
    'zst.pu.Se9': {
        name: 'Se9',
        locoNetId: 2009,
        type: signalTypes_1.signalTypes.TYPE_SHUNT,
        lights: ['M', 'B'],
    },
    'zst.pu.Se11': {
        name: 'Se11',
        locoNetId: 2011,
        type: signalTypes_1.signalTypes.TYPE_SHUNT,
        lights: ['M', 'B'],
    },
    'zst.pu.Se19': {
        name: 'Se19',
        locoNetId: 2019,
        type: signalTypes_1.signalTypes.TYPE_SHUNT,
        lights: ['M', 'B'],
    },
    'zst.pu.Se20': {
        name: 'Se20',
        locoNetId: 2020,
        construction: 'T',
        type: signalTypes_1.signalTypes.TYPE_SHUNT,
        lights: ['M', 'B'],
    },
    'zst.pu.Se102': {
        name: 'Se102',
        locoNetId: 2102,
        type: signalTypes_1.signalTypes.TYPE_SHUNT,
        lights: ['M', 'B'],
    },
    'zst.pu.Se21': {
        name: 'Se21',
        locoNetId: 2021,
        construction: 'T',
        type: signalTypes_1.signalTypes.TYPE_SHUNT,
        lights: ['M', 'B'],
    },
    'zst.pu.Se22': {
        name: 'Se22',
        locoNetId: 2022,
        construction: 'T',
        type: signalTypes_1.signalTypes.TYPE_SHUNT,
        lights: ['M', 'B'],
    },
    'zst.pu.Se23': {
        name: 'Se23',
        locoNetId: 2023,
        construction: 'T',
        type: signalTypes_1.signalTypes.TYPE_SHUNT,
        lights: ['M', 'B'],
    },
    'zst.pu.Se24': {
        name: 'Se24',
        locoNetId: 2024,
        construction: 'T',
        type: signalTypes_1.signalTypes.TYPE_SHUNT,
        lights: ['M', 'B'],
    },
    'zst.pu.Se25': {
        name: 'Se25',
        locoNetId: 2025,
        construction: 'T',
        type: signalTypes_1.signalTypes.TYPE_SHUNT,
        lights: ['M', 'B'],
    },
    'zst.pu.Se26': {
        name: 'Se26',
        locoNetId: 2026,
        construction: 'T',
        type: signalTypes_1.signalTypes.TYPE_SHUNT,
        lights: ['M', 'B'],
    },
    'zst.pu.Se27': {
        name: 'Se27',
        locoNetId: 2027,
        construction: 'T',
        type: signalTypes_1.signalTypes.TYPE_SHUNT,
        lights: ['M', 'B'],
    },
    'zst.pu.Se29': {
        name: 'Se29',
        locoNetId: 2029,
        construction: 'T',
        type: signalTypes_1.signalTypes.TYPE_SHUNT,
        lights: ['M', 'B'],
    },
    'zst.pu.Se34': {
        name: 'Se34',
        locoNetId: 2034,
        construction: 'T',
        type: signalTypes_1.signalTypes.TYPE_SHUNT,
        lights: ['M', 'B'],
    },
    'zst.pu.Se35': {
        name: 'Se35',
        locoNetId: 2035,
        construction: 'T',
        type: signalTypes_1.signalTypes.TYPE_SHUNT,
        lights: ['M', 'B'],
    },
    'zst.pu.Se36': {
        name: 'Se36',
        locoNetId: 2036,
        construction: 'T',
        type: signalTypes_1.signalTypes.TYPE_SHUNT,
        lights: ['M', 'B'],
    },
    'zst.pu.Se37': {
        name: 'Se37',
        locoNetId: 2037,
        construction: 'T',
        type: signalTypes_1.signalTypes.TYPE_SHUNT,
        lights: ['M', 'B'],
    },
    'zst.pu.Se38': {
        name: 'Se38',
        locoNetId: 2038,
        construction: 'T',
        type: signalTypes_1.signalTypes.TYPE_SHUNT,
        lights: ['M', 'B'],
    },
    'zst.pu.Se39': {
        name: 'Se39',
        locoNetId: 2039,
        construction: 'T',
        type: signalTypes_1.signalTypes.TYPE_SHUNT,
        lights: ['M', 'B'],
    },
    'zst.pu.Se40': {
        name: 'Se40',
        locoNetId: 2040,
        construction: 'T',
        type: signalTypes_1.signalTypes.TYPE_SHUNT,
        lights: ['M', 'B'],
    },
};
exports.default = shuntSignals;
//# sourceMappingURL=shunt.js.map