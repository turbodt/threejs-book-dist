"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LifeCycle = exports.hasOnDeletion = exports.hasOnInit = exports.hasOnBeenDetached = exports.hasOnDetach = exports.hasOnBeenAttached = exports.hasOnAttach = exports.hasOnCreation = void 0;
const hasOnCreation = (obj) => 'onCreation' in obj;
exports.hasOnCreation = hasOnCreation;
const hasOnAttach = (obj) => 'onAttach' in obj;
exports.hasOnAttach = hasOnAttach;
const hasOnBeenAttached = (obj) => 'onBeenAttached' in obj;
exports.hasOnBeenAttached = hasOnBeenAttached;
const hasOnDetach = (obj) => 'onDetach' in obj;
exports.hasOnDetach = hasOnDetach;
const hasOnBeenDetached = (obj) => 'onBeenDetached' in obj;
exports.hasOnBeenDetached = hasOnBeenDetached;
const hasOnInit = (obj) => 'onInit' in obj;
exports.hasOnInit = hasOnInit;
const hasOnDeletion = (obj) => 'onDeletion' in obj;
exports.hasOnDeletion = hasOnDeletion;
/**
 *
 * class LifeCycle
 *
 * Manages the lifecycle of a component
 *
 */
class LifeCycle {
    constructor(component) {
        this.component = component;
    }
    onCreation() {
        if ((0, exports.hasOnCreation)(this.component)) {
            this.component.onCreation();
        }
    }
    onAttach(child) {
        if ((0, exports.hasOnAttach)(this.component)) {
            this.component.onAttach(child);
        }
    }
    onBeenAttached(parent) {
        if ((0, exports.hasOnBeenAttached)(this.component)) {
            this.component.onBeenAttached(parent);
        }
    }
    onDetach(child) {
        if ((0, exports.hasOnDetach)(this.component)) {
            this.component.onDetach(child);
        }
    }
    onBeenDetached(parent) {
        if ((0, exports.hasOnBeenDetached)(this.component)) {
            this.component.onBeenDetached(parent);
        }
    }
    onInit() {
        if ((0, exports.hasOnInit)(this.component)) {
            this.component.onInit();
        }
    }
    onDeletion() {
        if ((0, exports.hasOnDeletion)(this.component)) {
            this.component.onDeletion();
        }
    }
}
exports.LifeCycle = LifeCycle;
