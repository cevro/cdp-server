"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const signalTypes_1 = require("app/consts/signals/signalTypes");
const entrySignals = {
    'zst.pu.1L': {
        name: '1L',
        locoNetId: 1,
        construction: 'K',
        type: signalTypes_1.signalTypes.TYPE_ENTRY,
        lights: ['HZ', 'Z', 'C', 'B', 'DZ'],
    },
    'zst.pu.2L': {
        name: '2L',
        locoNetId: 2,
        construction: 'K',
        type: signalTypes_1.signalTypes.TYPE_ENTRY,
        lights: ['HZ', 'Z', 'C', 'B', 'DZ'],
    },
    'zst.pu.1S': {
        name: '1S',
        locoNetId: 517,
        type: signalTypes_1.signalTypes.TYPE_ENTRY,
        lights: ['HZ', 'Z', 'C', 'B', 'X', 'DZ'],
    },
    'zst.pu.2S': {
        name: '2S',
        locoNetId: 21,
        type: signalTypes_1.signalTypes.TYPE_ENTRY,
        lights: ['HZ', 'Z', 'C', 'B', 'X', 'DZ'],
    },
    'zst.pu.1BS': {
        name: '1BS',
        locoNetId: 22,
        type: signalTypes_1.signalTypes.TYPE_ENTRY,
        lights: ['HZ', 'Z', 'C', 'B', 'X', 'DZ'],
    },
    'zst.pu.2BS': {
        name: '2BS',
        locoNetId: 23,
        type: signalTypes_1.signalTypes.TYPE_ENTRY,
        lights: ['HZ', 'Z', 'C', 'B', 'X', 'DZ'],
    },
};
exports.default = entrySignals;
//# sourceMappingURL=entry.js.map