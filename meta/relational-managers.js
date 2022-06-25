"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChildrenRelationalManager = exports.ParentRelationalManager = void 0;
const errors_1 = require("./errors");
class ParentRelationalManager {
    constructor(child) {
        this.child = child;
    }
    get target() {
        return this.__target;
    }
    set target(target) {
        this.__target = target;
    }
    detach() {
        if (this.target !== undefined) {
            this.target.lifecycle.onDetach(this.child);
            this.target = undefined;
        }
        return this;
    }
    attach(parent) {
        if (this.target !== undefined) {
            throw new errors_1.ComponentError('New parent attached before unattach the current one.');
        }
        parent.lifecycle.onAttach(this.child);
        this.target = parent;
        return this;
    }
}
exports.ParentRelationalManager = ParentRelationalManager;
class ChildrenRelationalManager extends Array {
    constructor(parent, ...args) {
        super(...args);
        this.parent = parent;
    }
    attach(...components) {
        components.forEach((component) => {
            component.lifecycle.onBeenAttached(this.parent);
            this.push(component);
        });
        return this;
    }
    detach(...components) {
        const childrenIndexes = this.parseChildrenIndexes(components);
        childrenIndexes.forEach((index) => {
            const component = this[index];
            if (component !== undefined) {
                component.lifecycle.onBeenDetached(this.parent);
                component.parent = undefined;
            }
        });
        return this;
    }
    delete(...components) {
        const childrenIndexes = this.parseChildrenIndexes(components);
        childrenIndexes.forEach((index) => {
            const component = this.splice(index, 1)[0];
            component === null || component === void 0 ? void 0 : component.delete();
        });
        return this;
    }
    deleteAll() {
        return this.delete(...this);
    }
    findChildIndex(component) {
        return this.findIndex((child) => component === child);
    }
    parseChildrenIndexes(components) {
        return (components
            .map((component) => this.findChildIndex(component))
            .filter((index) => index >= 0)
            // sort reversed
            .sort((a, b) => b - a));
    }
}
exports.ChildrenRelationalManager = ChildrenRelationalManager;
