import {LocoNetDefinition} from '../interfaces';

export type SignalLight = 'HZ' | 'Z' | 'C' | 'B' | 'X' | 'DZ' | 'M';

export type SignalBackEndDefinition = LocoNetDefinition;

export interface SignalDefinition extends SignalBackEndDefinition {
    name: string;
    type: number;
    construction?: 'T' | 'K';
    lights: SignalLight [];
    spec?: 'last-AB';
}

export interface SignalSchemeDefinition extends SignalDefinition {
    SVGData: {
        rotate: number;
        x: number;
        y: number;
    };
}
