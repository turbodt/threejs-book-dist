"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransitionalValue = void 0;
const task_queuer_1 = require("./task-queuer");
class TransitionalValue {
    constructor(current, props) {
        this.current = current;
        this._state = 0 /* TransitionalValueStates.Stopped */;
        this.queuer = new task_queuer_1.TaskQueuer();
        this.defaultDuration = 0;
        this.easing = TransitionalValue.EaseInOut;
        this.parametrization = props.parametrization;
        if (props.easing !== undefined) {
            this.easing = props.easing;
        }
        if (props.defaultDuration !== undefined) {
            this.defaultDuration = props.defaultDuration;
        }
        if (props.queuer !== undefined) {
            this.queuer = props.queuer;
        }
        this.queuer.start();
    }
    get state() {
        return this._state;
    }
    setImmediately(target) {
        this.current = target;
        return this;
    }
    abort() {
        this.queuer.clear();
        if (this.abortCurrentTask !== undefined) {
            this.abortCurrentTask();
        }
        this.clearTransition();
        return this;
    }
    clearTransition() {
        this.target = undefined;
        this.duration = undefined;
        this._state = 0 /* TransitionalValueStates.Stopped */;
        this.startedTime = undefined;
        this.abortCurrentTask = undefined;
        return this;
    }
    prepareOne(target, options) {
        const [task, latch] = this.queuer.createTask((resolve) => {
            this.target = target;
            this.startedTime = Date.now();
            this._state = 1 /* TransitionalValueStates.Running */;
            this.duration = (options === null || options === void 0 ? void 0 : options.duration) || this.defaultDuration;
            const timeoutId = setTimeout(() => {
                this.setImmediately(this.target);
                this.clearTransition();
                resolve(this);
            }, this.duration);
            this.abortCurrentTask = () => {
                clearTimeout(timeoutId);
                resolve(this);
            };
        });
        return [task, latch];
    }
    setOne(target, options) {
        const [task, latch] = this.prepareOne(target, options);
        this.queuer.queue(task);
        return [task, latch];
    }
    prepare(...values) {
        return values
            .map((value) => this.prepareOne(value))
            .map(([task, latch]) => ({ task, latch }));
    }
    set(...values) {
        let lastLatch = Promise.resolve(this);
        for (const value of values) {
            lastLatch = this.setOne(value)[1];
        }
        return lastLatch;
    }
    get value() {
        if (this.state == 0 /* TransitionalValueStates.Stopped */ ||
            this.target === undefined) {
            return this.current;
        }
        else {
            return this.parametrization(this.easing(Math.min(1, (Date.now() - this.startedTime) /
                this.duration)), this.current, this.target);
        }
    }
}
exports.TransitionalValue = TransitionalValue;
TransitionalValue.EaseInOut = function easeInOutCubic(x) {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};
TransitionalValue.Linear = function (x) {
    return x;
};
