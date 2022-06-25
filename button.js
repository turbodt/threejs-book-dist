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
exports.Button = void 0;
const THREE = __importStar(require("three"));
const services_1 = require("./services");
const object3d_component_1 = require("./object3d-component");
class Button extends object3d_component_1.Object3DComponent {
    constructor() {
        super();
        const { touchManager, mouseManager } = (0, services_1.useScreenInputManager)();
        this.touchManager = touchManager;
        this.mouseManager = mouseManager;
    }
    get object3d() {
        return this.__object3d;
    }
    set object3d(mesh) {
        super.object3d = mesh;
    }
    onCreation() {
        const { onClick, geometry = this.getDefaultGeometry(), material = this.getDefaultMaterial(), } = this.props;
        const setCursor = ({ intersections }) => {
            if (intersections.length > 0) {
                this.touchManager.canvas.style.cursor = 'pointer';
            }
            else {
                this.touchManager.canvas.style.cursor = 'inherit';
            }
        };
        this.object3d = new THREE.Mesh(geometry, material);
        this.touchManager.for(this.object3d).addListener('tap', (event) => {
            event.preventDefault();
            if (onClick !== undefined) {
                onClick(event);
            }
        });
        this.mouseManager
            .for(this.object3d)
            .addListener('enter', setCursor)
            .addListener('leave', setCursor);
    }
    getDefaultGeometry() {
        const geometry = new THREE.CylinderGeometry(1, 1, 0.25, 25, 1);
        geometry.rotateX(Math.PI / 2);
        return geometry;
    }
    getDefaultMaterial() {
        const material = new THREE.MeshBasicMaterial({
            color: 0xff0000,
        });
        return material;
    }
}
exports.Button = Button;
