"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LifeCycleError = exports.ComponentError = exports.NotImplementedError = void 0;
class MetaError extends Error {
    constructor(msg) {
        super(msg);
        Object.setPrototypeOf(this, MetaError.prototype);
    }
}
class NotImplementedError extends MetaError {
    constructor() {
        super('Not implemented error.');
        Object.setPrototypeOf(this, NotImplementedError.prototype);
    }
}
exports.NotImplementedError = NotImplementedError;
class ComponentError extends MetaError {
    constructor(msg) {
        super(`Component Error: ${msg}`);
        Object.setPrototypeOf(this, ComponentError.prototype);
    }
}
exports.ComponentError = ComponentError;
class LifeCycleError extends MetaError {
    constructor(msg) {
        super(`LifeCycle Error: ${msg}`);
        Object.setPrototypeOf(this, LifeCycleError.prototype);
    }
}
exports.LifeCycleError = LifeCycleError;
