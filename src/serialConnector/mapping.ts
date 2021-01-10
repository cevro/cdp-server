interface SerialMap {
    [uId: string]: number;
}

export class SerialMapping {
    private static serialMap: SerialMap = {
        'zst.pu.a.1L': 517,
        /*'zst.pu.a.1S': 517,
        'ab.pu-lpm.a.1-22': 515,
        'ab.pu-lpm.a.2-22': 514,
        'ab.pu-lpm.a.1-34': 513,
        'ab.pu-lpm.a.2-34': 512,
        'ab.pu-lpm.a.1-50': 511,
        'ab.pu-lpm.a.2-50': 510,
        'ab.pu-lpm.a.1-64': 509,
        'ab.pu-lpm.a.2-64': 508,
        'ab.pu-lpm.a.1-76': 507,
        'ab.pu-lpm.a.2-76': 506,
        'ab.pu-lpm.a.1-90': 505,
        'ab.pu-lpm.a.2-90': 504,
        'ab.pu-lpm.a.1-102': 503,
        'ab.pu-lpm.a.2-102': 502,
        'ab.pu-lpm.a.1-116': 501,
        'ab.pu-lpm.a.2-116': 500,
        'ab.pu-lpm.a.1-15': 519,
        'ab.pu-lpm.a.2-15': 518,
        'ab.pu-lpm.a.1-29': 521,
        'ab.pu-lpm.a.2-29': 520,
        'ab.pu-lpm.a.1-39': 523,
        'ab.pu-lpm.a.2-39': 522,
        'ab.pu-lpm.a.1-51': 525,
        'ab.pu-lpm.a.2-51': 524,
        'ab.pu-lpm.a.1-65': 527,
        'ab.pu-lpm.a.2-65': 526,
        'ab.pu-lpm.a.1-75': 529,
        'ab.pu-lpm.a.2-75': 528,
        'ab.pu-lpm.a.1-87': 531,
        'ab.pu-lpm.a.2-87': 530,
        'ab.pu-lpm.a.1-101': 533,
        'ab.pu-lpm.a.2-101': 532,
        'ab.pu-lpm.a.1-115': 535,
        'ab.pu-lpm.a.2-115': 534,*/
    };

    public constructor() {
        throw Error('Static class');
    }

    public static getSerialId(uId: string): number | null {
        if (this.serialMap.hasOwnProperty(uId)) {
            return this.serialMap[uId];
        }
        return null;
    }

    public static getUId(id: number): string | null {
        for (const key in this.serialMap) {
            if (this.serialMap.hasOwnProperty(key)) {
                if (this.serialMap[key] === id) {
                    return key;
                }
            }
        }
        return null;
    }
}
