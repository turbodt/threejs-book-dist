import { ConstructorOf } from './definitions';
import { LifeCycle } from './lifecycle';
import { ChildrenRelationalManager, ParentRelationalManager } from './relational-managers';
export declare type PropsOf<T extends IComponent> = T extends IComponent<infer Props> ? Props : never;
export declare type StateOf<T extends IComponent> = T extends IComponent<infer State> ? State : never;
export interface IComponent<Props extends {} = {}, State extends {} = {}> {
    props: Props;
    lifecycle: LifeCycle<Component<Props, State>>;
    parent: IComponent | undefined;
    children: ChildrenRelationalManager<Component<Props, State>>;
    delete: () => IComponent<Props>;
}
export declare abstract class Component<Props extends {} = {}, State extends {} = {}> implements IComponent<Props, State> {
    protected __props?: Props;
    protected __state?: State;
    protected __lifecycle: LifeCycle<Component<Props, State>>;
    protected __children: ChildrenRelationalManager<Component<Props, State>>;
    protected __parent: ParentRelationalManager<Component<Props, State>>;
    constructor();
    static create<T extends Component>(this: ConstructorOf<T>, props: PropsOf<T>, constructorArgs: any[], parent?: Component): T;
    protected get state(): State;
    protected set state(state: State);
    get props(): Props;
    get parent(): Component | undefined;
    set parent(parent: Component | undefined);
    get root(): IComponent;
    get lifecycle(): LifeCycle<Component<Props, State>>;
    get children(): ChildrenRelationalManager<Component<Props, State>>;
    delete(): Component<Props, State>;
}
