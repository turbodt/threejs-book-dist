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
exports.Camera = void 0;
const THREE = __importStar(require("three"));
const OrbitControls_1 = require("three/examples/jsm/controls/OrbitControls");
const object3d_component_1 = require("./object3d-component");
const screen_input_manager_1 = require("./services/screen-input-manager");
class Camera extends object3d_component_1.Object3DComponent {
    constructor() {
        super(...arguments);
        this.__object3d = new THREE.PerspectiveCamera();
        this.raycaster = new THREE.Raycaster();
        this.planeNormal = new THREE.Vector3(0, 0, 1);
        this.plane = new THREE.Plane(this.planeNormal);
        this.getViewSizeAtPlane = (w = 0) => {
            // get camera direction
            this.object3d.getWorldDirection(this.planeNormal);
            this.plane.setComponents(this.planeNormal.x, this.planeNormal.y, this.planeNormal.z, w);
            const corners = [
                [-1, -1],
                [1, -1],
                [-1, 1],
            ]
                .map(([x, y]) => new THREE.Vector2(x, y))
                .map((corner) => {
                this.raycaster.setFromCamera(corner, this.object3d);
                const ray = this.raycaster.ray;
                const target = new THREE.Vector3();
                return ray.intersectPlane(this.plane, target);
            });
            return [
                corners[1].distanceTo(corners[0]),
                corners[2].distanceTo(corners[0]),
            ];
        };
    }
    get object3d() {
        return this.__object3d;
    }
    get controls() {
        return this.state.controls;
    }
    onInit() {
        const canvas = this.props.renderer.domElement;
        this.__object3d = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        this.object3d.position.set(0, 0, 10);
        this.object3d.lookAt(0, 0, 0);
        (0, screen_input_manager_1.initializeScreenInputManager)(canvas, this.object3d);
        const controls = new OrbitControls_1.OrbitControls(this.object3d, canvas);
        this.state = { controls };
        this.controls.target.set(0, 0, 0);
        // this.controls.enableZoom = false;
        //this.controls.enabled = false;
        this.controls.update();
    }
    render(renderer) {
        const canvas = renderer.domElement;
        this.object3d.aspect = canvas.clientWidth / canvas.clientHeight;
        this.object3d.updateProjectionMatrix();
        super.render(renderer);
    }
}
exports.Camera = Camera;
