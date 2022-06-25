"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeScreenInputManager = exports.useScreenInputManager = void 0;
const threejs_screen_input_manager_1 = require("threejs-screen-input-manager");
_a = (() => {
    let touchManager;
    let mouseManager;
    const useScreenInputManager = () => {
        if (touchManager === undefined || mouseManager === undefined) {
            throw new Error('Initialization is not done!');
        }
        return { touchManager, mouseManager };
    };
    const initializeScreenInputManager = (canvas, camera) => {
        if (touchManager === undefined) {
            touchManager = new threejs_screen_input_manager_1.TouchManager(canvas, camera);
        }
        if (mouseManager === undefined) {
            mouseManager = new threejs_screen_input_manager_1.MouseManager(canvas, camera);
        }
    };
    return { useScreenInputManager, initializeScreenInputManager };
})(), exports.useScreenInputManager = _a.useScreenInputManager, exports.initializeScreenInputManager = _a.initializeScreenInputManager;
