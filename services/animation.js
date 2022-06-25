"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTransition = exports.useAnimation = void 0;
const utils_1 = require("../utils");
exports.useAnimation = (() => {
    let animationQueuer;
    const useAnimation = () => {
        if (animationQueuer === undefined) {
            animationQueuer = new utils_1.TaskQueuer();
            animationQueuer.start();
        }
        return {
            queuer: animationQueuer,
        };
    };
    return useAnimation;
})();
const useTransition = (current, props) => {
    const newProps = Object.assign({}, props);
    if (!('queuer' in newProps)) {
        const { queuer } = (0, exports.useAnimation)();
        newProps.queuer = queuer;
    }
    return new utils_1.TransitionalValue(current, newProps);
};
exports.useTransition = useTransition;
