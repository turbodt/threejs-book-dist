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
exports.FrontButtons = void 0;
const THREE = __importStar(require("three"));
const object3d_component_1 = require("./object3d-component");
const button_1 = require("./button");
class FrontButtons extends object3d_component_1.Object3DComponent {
    getInitialState() {
        var _a, _b, _c, _d, _e;
        if (((_a = this.props.arrows) === null || _a === void 0 ? void 0 : _a.visible) === false) {
            return {};
        }
        const offsetScale = 5.0 * this.props.sceneAspectRatio;
        const rightButton = button_1.Button.create({
            onClick: (_c = (_b = this.props.arrows) === null || _b === void 0 ? void 0 : _b.right) === null || _c === void 0 ? void 0 : _c.callback,
            material: this.getRightMaterial(),
            geometry: this.getGeometry(),
        }, [], this);
        rightButton.object3d.translateX(offsetScale);
        const leftButton = button_1.Button.create({
            onClick: (_e = (_d = this.props.arrows) === null || _d === void 0 ? void 0 : _d.left) === null || _e === void 0 ? void 0 : _e.callback,
            material: this.getLeftMaterial(),
            geometry: this.getGeometry(),
        }, [], this);
        leftButton.object3d.translateX(-offsetScale);
        leftButton.object3d.rotateY(Math.PI);
        return { leftButton, rightButton };
    }
    onInit() {
        const scale = 0.1;
        this.object3d.translateZ(-0.05);
        this.object3d.scale.set(scale, scale, scale);
    }
    getLeftMaterial() {
        const material = new THREE.MeshPhongMaterial({
            color: this.getLeftColor(),
        });
        return material;
    }
    getRightMaterial() {
        const material = new THREE.MeshPhongMaterial({
            color: this.getRightColor(),
        });
        return material;
    }
    getGeometry() {
        const arrowShape = new THREE.Shape();
        const R = 0.1, V = 0.5, D = 0.7, HM = -0.3;
        const V1 = V + D / 2;
        const H = 1 - V - D / 2 + HM;
        const DP = Math.sqrt(V1 * V1 + (1 - H) * (1 - H));
        const SP = (R * (1 - H)) / V1;
        // const ALP_P = Math.atan2(V1, 1 - H);
        arrowShape.moveTo(-1, 0);
        arrowShape.lineTo(-1, -D / 2 + R);
        arrowShape.arc(R, 0, R, Math.PI, (3 * Math.PI) / 2, false);
        arrowShape.lineTo(H - R, -D / 2);
        arrowShape.arc(0, -R, R, Math.PI / 2, 0, true);
        arrowShape.lineTo(H, -V1);
        arrowShape.lineTo(1 - (SP / DP) * (1 - H), (-SP / DP) * V1);
        arrowShape.quadraticCurveTo(1, 0, 1 - (SP / DP) * (1 - H), (+SP / DP) * V1);
        arrowShape.lineTo(H, V1);
        /*
        arrowShape.lineTo(1 - (SP / DP) * (1 - H), (-SP / DP) * V1);
        arrowShape.arc(
          -(R / V1) * DP + (SP / DP) * (1 - H),
          (SP / DP) * V1,
          R,
          ALP_P - Math.PI / 2,
          ALP_P,
          false,
        );
        arrowShape.lineTo(H, V1);
        */
        /*
        arrowShape.lineTo(1, 0);
        arrowShape.lineTo(H, V1);
        */
        /*
        arrowShape.quadraticCurveTo(1, 0, H, V1);
        */
        arrowShape.lineTo(H, D / 2 + R);
        arrowShape.arc(-R, 0, R, 0, (3 * Math.PI) / 2, true);
        arrowShape.lineTo(-1 + R, D / 2);
        arrowShape.arc(0, -R, R, Math.PI / 2, Math.PI, false);
        arrowShape.lineTo(-1, 0);
        const extrudeSettings = {
            depth: 0.25,
            bevelEnabled: true,
            bevelSegments: 1,
            steps: 1,
            bevelSize: 0.1,
            bevelThickness: 0.1,
        };
        const geometry = new THREE.ExtrudeGeometry(arrowShape, extrudeSettings);
        const scale = 1.25;
        geometry.scale(scale, scale, scale);
        return geometry;
    }
    getLeftColor() {
        var _a, _b, _c;
        const color = ((_b = (_a = this.props.arrows) === null || _a === void 0 ? void 0 : _a.left) === null || _b === void 0 ? void 0 : _b.color) || ((_c = this.props.arrows) === null || _c === void 0 ? void 0 : _c.color);
        return color ? new THREE.Color(color) : new THREE.Color(0xff000);
    }
    getRightColor() {
        var _a, _b, _c;
        const color = ((_b = (_a = this.props.arrows) === null || _a === void 0 ? void 0 : _a.right) === null || _b === void 0 ? void 0 : _b.color) || ((_c = this.props.arrows) === null || _c === void 0 ? void 0 : _c.color);
        return color ? new THREE.Color(color) : new THREE.Color(0xff000);
    }
}
exports.FrontButtons = FrontButtons;
