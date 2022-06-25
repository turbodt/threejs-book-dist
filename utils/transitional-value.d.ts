import { TaskQueuer } from './task-queuer';
declare const enum TransitionalValueStates {
    Stopped = 0,
    Running = 1
}
export interface ITransitionalValueProps<T> {
    parametrization: (value: number, current: T, target: T) => T;
    defaultDuration?: number;
    easing?: (t: number) => number;
    queuer?: TaskQueuer<TransitionalValue<T>>;
}
export declare class TransitionalValue<T> {
    protected current: T;
    protected startedTime?: number;
    protected _state: TransitionalValueStates;
    protected target?: T;
    protected duration?: number;
    protected abortCurrentTask?: () => void;
    queuer: TaskQueuer<TransitionalValue<T>>;
    parametrization: (value: number, actual: T, target: T) => T;
    defaultDuration: number;
    easing: (t: number) => number;
    static readonly EaseInOut: (x: number) => number;
    static readonly Linear: (x: number) => number;
    constructor(current: T, props: ITransitionalValueProps<T>);
    get state(): TransitionalValueStates;
    setImmediately(target: T): TransitionalValue<T>;
    abort(): TransitionalValue<T>;
    protected clearTransition(): TransitionalValue<T>;
    protected prepareOne(target: T, options?: {
        duration?: number;
        easing?: (t: number) => number;
    }): [() => Promise<TransitionalValue<T>>, Promise<TransitionalValue<T>>];
    protected setOne(target: T, options?: {
        duration?: number;
        easing?: (t: number) => number;
    }): [() => Promise<TransitionalValue<T>>, Promise<TransitionalValue<T>>];
    prepare(...values: T[]): {
        task: () => Promise<TransitionalValue<T>>;
        latch: Promise<TransitionalValue<T>>;
    }[];
    set(...values: T[]): Promise<TransitionalValue<T>>;
    get value(): T;
}
export {};
