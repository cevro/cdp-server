"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const signalTypes_1 = require("app/consts/signals/signalTypes");
const pathSignalsL = {
    'zst.pu.Lc3': {
        name: 'Lc3',
        locoNetId: 106,
        type: signalTypes_1.signalTypes.TYPE_PATH,
        lights: ['HZ', 'C', 'B', 'X', 'DZ'],
    },
    'zst.pu.Lc14': {
        name: 'Lc14',
        locoNetId: 12,
        type: signalTypes_1.signalTypes.TYPE_PATH,
        lights: ['HZ', 'C', 'B', 'X', 'DZ'],
    },
    'zst.pu.Lc16': {
        name: 'Lc16',
        locoNetId: 13,
        type: signalTypes_1.signalTypes.TYPE_PATH,
        lights: ['HZ', 'C', 'B', 'X', 'DZ'],
    },
};
const pathSignalsS = {
    'zst.pu.Sc3a': {
        name: 'Sc3a',
        locoNetId: 24,
        type: signalTypes_1.signalTypes.TYPE_PATH,
        lights: ['HZ', 'C', 'B', 'X', 'DZ'],
    },
    'zst.pu.Sc14a': {
        name: 'Sc14a',
        locoNetId: 25,
        type: signalTypes_1.signalTypes.TYPE_PATH,
        lights: ['HZ', 'C', 'B', 'X', 'DZ'],
    },
};
exports.default = Object.assign(Object.assign({}, pathSignalsL), { pathSignalsS });
//# sourceMappingURL=path.js.map