export declare type ConstructorOf<T extends {} = {}> = {
    prototype: T;
    new (...args: any[]): T;
};
export declare type WithoutFirst<T extends [any, ...any[]]> = T extends [
    any,
    ...infer U
] ? U : never;
