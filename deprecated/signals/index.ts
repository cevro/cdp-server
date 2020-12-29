import entrySignals from "app/consts/objects/zst/pu/signals/entry";
import exitSignals from "app/consts/objects/zst/pu/signals/entry";
import pathSignals from 'app/consts/objects/zst/pu/signals/entry';
import shuntSignals from "app/consts/objects/zst/pu/signals/shunt";
export default {
    ...entrySignals,
    ...exitSignals,
    ...pathSignals,
    ...shuntSignals,
};
