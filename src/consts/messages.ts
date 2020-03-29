export interface Message<T = any> {
    readonly uri: string;
    readonly method: METHOD_TYPE;
    readonly data: T;
}

export type METHOD_TYPE = 'post' | 'get' | 'patch' | 'delete';