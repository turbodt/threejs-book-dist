import { Component } from './component';
export declare class ParentRelationalManager<C extends Component> {
    protected child: C;
    protected __target?: Component;
    constructor(child: C);
    get target(): Component | undefined;
    protected set target(target: Component | undefined);
    detach(): ParentRelationalManager<C>;
    attach(parent: Component): ParentRelationalManager<C>;
}
export declare class ChildrenRelationalManager<P extends Component> extends Array<Component> {
    protected parent: P;
    constructor(parent: P, ...args: any);
    attach(...components: Component[]): ChildrenRelationalManager<P>;
    detach(...components: Component[]): ChildrenRelationalManager<P>;
    delete(...components: Component[]): ChildrenRelationalManager<P>;
    deleteAll(): ChildrenRelationalManager<P>;
    protected findChildIndex(component: Component): number;
    protected parseChildrenIndexes(components: Component[]): number[];
}
