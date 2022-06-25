"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Component = void 0;
const errors_1 = require("./errors");
const lifecycle_1 = require("./lifecycle");
const relational_managers_1 = require("./relational-managers");
const hasGetInitialState = (obj) => 'getInitialState' in obj;
class Component {
    constructor() {
        this.__lifecycle = new lifecycle_1.LifeCycle(this);
        this.__children = new relational_managers_1.ChildrenRelationalManager(this);
        this.__parent = new relational_managers_1.ParentRelationalManager(this);
    }
    static create(props, constructorArgs, parent) {
        const component = new this(...constructorArgs);
        if (parent !== undefined) {
            component.parent = parent;
        }
        component.__props = props;
        component.__lifecycle.onCreation();
        if (hasGetInitialState(component)) {
            // avoid any sideeffect of set state overload
            component.__state = component.getInitialState();
        }
        component.lifecycle.onInit();
        return component;
    }
    get state() {
        if (this.__state === undefined) {
            throw new errors_1.ComponentError('State have been requested before been set yet.');
        }
        return this.__state;
    }
    set state(state) {
        this.__state = state;
    }
    get props() {
        if (this.__props === undefined) {
            throw new errors_1.ComponentError('Props have been requested before been set yet.');
        }
        return this.__props;
    }
    get parent() {
        var _a;
        return (_a = this.__parent) === null || _a === void 0 ? void 0 : _a.target;
    }
    set parent(parent) {
        if (this.parent !== undefined) {
            this.__parent.detach();
            this.parent.children.detach(this);
        }
        if (parent !== undefined) {
            parent.children.attach(this);
            this.__parent.attach(parent);
        }
    }
    get root() {
        const parent = this.parent;
        if (parent === undefined) {
            return this;
        }
        return parent;
    }
    get lifecycle() {
        return this.__lifecycle;
    }
    get children() {
        if (this.__children === undefined) {
            throw new errors_1.ComponentError('Children has been requested before been set yet.');
        }
        return this.__children;
    }
    delete() {
        this.children.forEach((child) => child.delete());
        this.parent = undefined;
        this.lifecycle.onDeletion();
        return this;
    }
}
exports.Component = Component;
