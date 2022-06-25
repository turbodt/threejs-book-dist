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
exports.ThreeBook = void 0;
const THREE = __importStar(require("three"));
const meta_1 = require("./meta");
const scene_1 = require("./scene");
class ThreeBook extends meta_1.Component {
    constructor() {
        super(...arguments);
        this.dpr = window.devicePixelRatio || 1;
        this.isAnimationRunning = false;
    }
    setView(nextViewIndex) {
        this.state.scene.book.setView(nextViewIndex);
    }
    setPage(nextPage) {
        this.state.scene.book.setPage(nextPage);
    }
    getInitialState() {
        const renderer = this.createRenderer(this.props.canvas);
        const scene = this.createScene(renderer);
        const render = this.createRender(renderer, scene);
        return { renderer, scene, render };
    }
    update(newProps) {
        this.state.scene.update({
            pages: newProps.pages,
            backgroundColor: newProps.backgroundColor,
            viewIndex: newProps.viewIndex,
            middleware: newProps.middleware,
            transitions: newProps.transitions,
        });
    }
    onResizeHandler(renderer) {
        const { width: cWidth, height: cHeight } = renderer.domElement.getBoundingClientRect();
        const width = cWidth * this.dpr;
        const height = cHeight * this.dpr;
        renderer.domElement.width = width;
        renderer.domElement.height = height;
        renderer.setSize(width, height, false);
    }
    createRenderer(canvas) {
        const renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true,
        });
        renderer.setPixelRatio(this.dpr);
        this.onResizeHandler(renderer);
        window.addEventListener('resize', this.onResizeHandler.bind(this, renderer));
        return renderer;
    }
    createScene(renderer) {
        const scene = scene_1.Scene.create({
            renderer,
            pages: this.props.pages,
            viewIndex: this.props.viewIndex,
            backgroundColor: this.props.backgroundColor,
            arrows: this.props.arrows,
            middleware: this.props.middleware,
            transitions: this.props.transitions,
        }, [], this);
        return scene;
    }
    createRender(renderer, scene) {
        const render = () => {
            scene.render(renderer);
            if (this.isAnimationRunning) {
                this.requestAnimationFrameId = requestAnimationFrame(render.bind(this));
            }
        };
        return render;
    }
    animate() {
        const start = () => {
            this.isAnimationRunning = true;
            requestAnimationFrame(this.state.render.bind(this));
        };
        const stop = () => {
            this.isAnimationRunning = false;
            if (this.requestAnimationFrameId !== undefined) {
                cancelAnimationFrame(this.requestAnimationFrameId);
                this.requestAnimationFrameId = undefined;
            }
        };
        return {
            start,
            stop,
        };
    }
    delete() {
        const { stop } = this.animate();
        stop();
        return super.delete();
    }
}
exports.ThreeBook = ThreeBook;
