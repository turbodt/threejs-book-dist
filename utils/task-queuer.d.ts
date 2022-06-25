declare type Task<T = any> = () => Promise<T>;
declare type PromiseExecutorResolve<T = any> = (t: T) => void;
declare type PromiseExecutorReject = (reason?: any) => void;
declare type PromiseExecutor<T = any> = (resolve: PromiseExecutorResolve<T>, reject: PromiseExecutorReject) => void;
export declare class TaskQueuer<T = any> {
    protected _tasks: Task<T>[];
    protected _currentTask: Task<T> | undefined;
    protected dispatchIsLatched: boolean;
    protected next: (result: IteratorResult<Task>) => void;
    protected reject: () => void;
    protected promise: Promise<IteratorResult<Task>>;
    protected setPromise(): void;
    protected dispatchNextTask(): void;
    get currentTask(): Task<T> | undefined;
    get tasks(): AsyncIterable<Task<T>>;
    start(): void;
    clear(): this;
    queue(task: Task<T>): this;
    createTask<T = any>(executor: PromiseExecutor<T>): [Task<T>, Promise<T>];
    mergeParallelTasks<T = any>(tasks: Iterable<Task<T>>): [Task<void>, Promise<void>];
    protected printInfo(...args: any[]): void;
}
export {};
