"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskQueuer = void 0;
class TaskQueuer {
    constructor() {
        this._tasks = [];
        this.dispatchIsLatched = false;
        this.next = (_) => { };
        this.reject = () => { };
        this.promise = new Promise(() => { });
    }
    setPromise() {
        this.promise = new Promise((resolve, reject) => {
            this.next = resolve;
            this.reject = reject;
        }).then((result) => {
            if (result.done) {
                return result;
            }
            this._currentTask = result.value;
            this.setPromise();
            return result;
        });
    }
    dispatchNextTask() {
        if (!this.dispatchIsLatched && this._tasks.length > 0) {
            this.dispatchIsLatched = true;
            const task = this._tasks.shift();
            this.next({ done: false, value: task });
        }
    }
    get currentTask() {
        return this._currentTask;
    }
    get tasks() {
        const queuer = this;
        return {
            [Symbol.asyncIterator]: () => ({
                next: () => queuer.promise,
            }),
        };
    }
    start() {
        this.setPromise();
        (() => __awaiter(this, void 0, void 0, function* () {
            var e_1, _a;
            try {
                for (var _b = __asyncValues(this.tasks), _c; _c = yield _b.next(), !_c.done;) {
                    const task = _c.value;
                    yield task();
                    this._currentTask = undefined;
                    this.dispatchIsLatched = false;
                    this.dispatchNextTask();
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) yield _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }))();
    }
    clear() {
        this._tasks.splice(0, this._tasks.length);
        return this;
    }
    queue(task) {
        this._tasks.push(task);
        this.dispatchNextTask();
        return this;
    }
    createTask(executor) {
        let resolve;
        let cancel = () => { };
        const latch = new Promise((res, rej) => {
            resolve = res;
            cancel = rej;
        });
        const task = () => Promise.race([new Promise(executor), latch]).then((t) => {
            resolve(t);
            return t;
        }, cancel);
        return [task, latch];
    }
    mergeParallelTasks(tasks) {
        return this.createTask((resolve, reject) => {
            Promise.allSettled(Array.from(tasks).map((task) => task()))
                .then((_) => resolve())
                .catch(reject);
        });
    }
    printInfo(...args) {
        console.group('Task Queuer');
        console.log(...args);
        console.log('Current Task', !!this._currentTask);
        console.log('Remaining tasks', this._tasks.length);
        console.groupEnd();
    }
}
exports.TaskQueuer = TaskQueuer;
