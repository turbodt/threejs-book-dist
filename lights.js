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
exports.Lights = void 0;
const THREE = __importStar(require("three"));
const object3d_component_1 = require("./object3d-component");
class Lights extends object3d_component_1.Object3DComponent {
    onInit() {
        const ambientLight = new THREE.AmbientLight(0x404040);
        this.object3d.add(ambientLight);
        const pointyLight = this.createPoinLight(0xffffff);
        this.object3d.add(pointyLight);
    }
    createPoinLight(color) {
        const light = new THREE.PointLight(color, 0.5, 100);
        light.add(new THREE.Mesh(new THREE.SphereGeometry(0.2, 10, 10), new THREE.MeshBasicMaterial({ color })));
        light.position.set(0, 0, 2);
        return light;
    }
}
exports.Lights = Lights;
