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
exports.Spiral = void 0;
const THREE = __importStar(require("three"));
const object3d_component_1 = require("./object3d-component");
class Spiral extends object3d_component_1.Object3DComponent {
    onCreation() {
        const geometry = this.getGeometry();
        const material = new THREE.LineBasicMaterial({
            color: 0x000000,
            linewidth: 5,
        });
        // Create the final object to add to the scene
        const mesh = new THREE.Line(geometry, material);
        this.object3d.add(mesh);
    }
    getGeometry() {
        const cHeight = 1;
        const cWidth = cHeight * this.props.rRadius * 2 * Math.PI;
        const angleDrift = Math.PI / 2;
        const numPoints = 2000;
        const R = cWidth * 0.05;
        const V = 2 * R;
        const paddingX = 0.05 * cWidth;
        let offsetY = -cHeight / 2 + R / 2;
        let offsetX = -cWidth / 2;
        const curvePath = new THREE.CurvePath();
        for (; offsetY < cHeight / 2; offsetY += 4 * R + V) {
            curvePath.add(new THREE.LineCurve3(new THREE.Vector3(offsetX + paddingX + R, offsetY, 0), new THREE.Vector3(offsetX + cWidth - paddingX - R, offsetY, 0)));
            curvePath.add(new THREE.CubicBezierCurve3(new THREE.Vector3(offsetX + cWidth - paddingX - R, offsetY, 0), new THREE.Vector3(offsetX + cWidth - paddingX + R, offsetY, 0), new THREE.Vector3(offsetX + cWidth - paddingX + R, offsetY + 2 * R + V, 0), new THREE.Vector3(offsetX + cWidth - paddingX - R, offsetY + 2 * R + V, 0)));
            curvePath.add(new THREE.LineCurve3(new THREE.Vector3(offsetX + cWidth - paddingX - R, offsetY + 2 * R + V, 0), new THREE.Vector3(offsetX + paddingX + R, offsetY + 2 * R + V, 0)));
            curvePath.add(new THREE.CubicBezierCurve3(new THREE.Vector3(offsetX + paddingX + R, offsetY + 2 * R + V, 0), new THREE.Vector3(offsetX + paddingX - R, offsetY + 2 * R + V, 0), new THREE.Vector3(offsetX + paddingX - R, offsetY + 4 * R + V, 0), new THREE.Vector3(offsetX + paddingX + R, offsetY + 4 * R + V, 0)));
        }
        const points = curvePath
            .getSpacedPoints(numPoints)
            .filter((v) => v.y < cHeight / 2)
            .map((v) => {
            const theta = (2 * Math.PI * v.x) / cWidth + angleDrift;
            const R = this.props.rRadius;
            return new THREE.Vector3(R * Math.cos(theta), v.y, R * Math.sin(theta));
        });
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        return geometry;
    }
}
exports.Spiral = Spiral;
