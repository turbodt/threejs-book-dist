import { Component } from './component';
/** LifeCycle events
 *
 * onCreation
 * onAttach
 * onBeenAttached
 * onDetach
 * onBeenDetached
 * onInit
 * onUpdate
 * onDeletion
 */
export interface IOnCreation {
    onCreation: () => void;
}
export declare const hasOnCreation: <T extends Component<{}, {}>>(obj: T) => obj is T & IOnCreation;
export interface IOnAttach<C extends Component> {
    onAttach: (child: C) => void;
}
export declare const hasOnAttach: <T extends Component<{}, {}>, C extends Component<{}, {}>>(obj: T) => obj is T & IOnAttach<C>;
export interface IOnBeenAttached<P extends Component> {
    onBeenAttached: (parent: P) => void;
}
export declare const hasOnBeenAttached: <T extends Component<{}, {}>, P extends Component<{}, {}>>(obj: T) => obj is T & IOnBeenAttached<P>;
export interface IOnDetach<C extends Component> {
    onDetach: (child: C) => void;
}
export declare const hasOnDetach: <T extends Component<{}, {}>, C extends Component<{}, {}>>(obj: T) => obj is T & IOnDetach<C>;
export interface IOnBeenDetached<P extends Component> {
    onBeenDetached: (parent: P) => void;
}
export declare const hasOnBeenDetached: <T extends Component<{}, {}>, P extends Component<{}, {}>>(obj: T) => obj is T & IOnBeenDetached<P>;
export interface IOnInit {
    onInit: () => void;
}
export declare const hasOnInit: <T extends Component<{}, {}>>(obj: T) => obj is T & IOnInit;
export interface IOnDeletion {
    onDeletion: () => void;
}
export declare const hasOnDeletion: <T extends Component<{}, {}>>(obj: T) => obj is T & IOnDeletion;
/**
 *
 * class LifeCycle
 *
 * Manages the lifecycle of a component
 *
 */
export declare class LifeCycle<C extends Component> {
    protected component: C;
    constructor(component: C);
    onCreation(): void;
    onAttach<C extends Component>(child: C): void;
    onBeenAttached<P extends Component>(parent: P): void;
    onDetach<C extends Component>(child: C): void;
    onBeenDetached<P extends Component>(parent: P): void;
    onInit(): void;
    onDeletion(): void;
}
