declare class MetaError extends Error {
    constructor(msg: string);
}
export declare class NotImplementedError extends MetaError {
    constructor();
}
export declare class ComponentError extends MetaError {
    constructor(msg: string);
}
export declare class LifeCycleError extends MetaError {
    constructor(msg: string);
}
export {};
