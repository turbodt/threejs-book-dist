"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scene = void 0;
const THREE = __importStar(require("three"));
const book_1 = require("./book");
const camera_1 = require("./camera");
const object3d_component_1 = require("./object3d-component");
const front_buttons_1 = require("./front-buttons");
const lights_1 = require("./lights");
class Scene extends object3d_component_1.Object3DComponent {
    constructor() {
        super(...arguments);
        this.isFirstFrame = true;
        this.__object3d = new THREE.Scene();
    }
    get object3d() {
        return this.__object3d;
    }
    get backgroundColor() {
        return this.object3d.background;
    }
    get book() {
        return this.state.book;
    }
    set backgroundColor(color) {
        this.object3d.background = new THREE.Color(color);
    }
    getInitialState() {
        var _a, _b, _c;
        const rBookWidth = 0.01;
        const rSpiralRadius = 0.04;
        const aspectRatio = 1.4142 * (1 + rBookWidth);
        const camera = camera_1.Camera.create({
            renderer: this.props.renderer,
        }, [], this);
        const book = book_1.Book.create({
            pages: this.props.pages,
            viewIndex: this.props.viewIndex,
            rSeparation: rBookWidth,
            spiral: {
                rRadius: rSpiralRadius,
            },
            middleware: this.props.middleware,
            transition: (_a = this.props.transitions) === null || _a === void 0 ? void 0 : _a.page,
        }, [], this);
        const frontButtons = front_buttons_1.FrontButtons.create({
            sceneAspectRatio: aspectRatio,
            arrows: Object.assign(Object.assign({}, this.props.arrows), { left: Object.assign({ callback: () => book.setView(book.viewIndex - 1) }, (_b = this.props.arrows) === null || _b === void 0 ? void 0 : _b.left), right: Object.assign({ callback: () => book.setView(book.viewIndex + 1) }, (_c = this.props.arrows) === null || _c === void 0 ? void 0 : _c.right) }),
        }, [], this);
        const lights = lights_1.Lights.create({}, [], this);
        return { camera, book, frontButtons, lights, rBookWidth, aspectRatio };
    }
    onInit() {
        const { backgroundColor = 0xffffff } = this.props;
        this.backgroundColor = backgroundColor;
    }
    update(newProps) {
        var _a;
        this.state.book.update({
            pages: newProps.pages,
            viewIndex: newProps.viewIndex,
            middleware: newProps.middleware,
            transition: (_a = newProps.transitions) === null || _a === void 0 ? void 0 : _a.page,
        });
        if (newProps.backgroundColor !== undefined) {
            this.backgroundColor = newProps.backgroundColor;
        }
    }
    scaleGroup() {
        const [vWidth, vHeight] = this.state.camera.getViewSizeAtPlane();
        let scale = 1;
        if (vWidth > vHeight * this.state.aspectRatio) {
            scale = vHeight;
        }
        else {
            scale = vWidth / this.state.aspectRatio;
        }
        scale *= 0.8;
        this.state.camera.object3d.position.divideScalar(scale);
    }
    onFirstFrame() {
        this.scaleGroup();
    }
    render(renderer) {
        super.render(renderer);
        renderer.render(this.object3d, this.state.camera.object3d);
        if (this.isFirstFrame) {
            this.onFirstFrame();
            this.isFirstFrame = false;
        }
    }
}
exports.Scene = Scene;
