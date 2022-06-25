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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sheet = void 0;
const THREE = __importStar(require("three"));
const definitions_1 = require("./definitions");
const services_1 = require("./services");
const object3d_component_1 = require("./object3d-component");
class Sheet extends object3d_component_1.Object3DComponent {
    constructor() {
        super();
        this.aspectRatio = 1 / 1.4142;
        this.frontMesh = new THREE.Mesh();
        this.backMesh = new THREE.Mesh();
        this.loader = (0, services_1.useTextureLoader)();
        const [alphaTexture, alphaTextureBack] = (0, services_1.useBorderAlphaTexture)();
        this.alphaTexture = alphaTexture;
        this.alphaTextureBack = alphaTextureBack;
    }
    get side() {
        return this.state.side;
    }
    get frontPage() {
        return this.state.frontPage;
    }
    set frontPage(frontPage) {
        if (frontPage === this.frontPage) {
            return;
        }
        this.onUpdateFrontPage(frontPage);
        this.state = Object.assign(Object.assign({}, this.state), { frontPage });
    }
    get backPage() {
        return this.state.backPage;
    }
    set backPage(backPage) {
        if (backPage === this.backPage) {
            return;
        }
        this.onUpdateBackPage(backPage);
        this.state = Object.assign(Object.assign({}, this.state), { backPage });
    }
    get z() {
        return this.frontMesh.position.z;
    }
    set z(z) {
        this.frontMesh.position.setZ(z);
        this.backMesh.position.setZ(z);
    }
    getInitialState() {
        var _a;
        const isCover = !!this.props.isCover;
        const side = this.props.side || 'right';
        const angle = side === 'right' ? 0 : -Math.PI;
        const rotationY = (0, services_1.useTransition)(angle, {
            parametrization: (t, a, b) => a + t * (b - a),
            defaultDuration: ((_a = this.props.transition) === null || _a === void 0 ? void 0 : _a.duration) || 1000,
        });
        const { frontPage, backPage } = this.props;
        return { side, rotationY, isCover, frontPage, backPage };
    }
    onInit() {
        const { frontPage, backPage, isCover } = this.state;
        const { axisOffset = 0 } = this.props;
        const height = isCover ? 1.02 : 1;
        const width = height * this.aspectRatio;
        const widthSegments = 50;
        const frontMaterialProps = (0, definitions_1.isImagePath)(frontPage)
            ? { map: this.loader.load(frontPage) }
            : { color: frontPage };
        const backMaterialProps = (0, definitions_1.isImagePath)(backPage)
            ? { map: this.loader.load(backPage) }
            : { color: backPage };
        let alphaTextureBack = this.alphaTexture;
        if (backMaterialProps.map !== undefined) {
            backMaterialProps.map.flipY = false;
            backMaterialProps.map.center.set(0.5, 0.5);
            backMaterialProps.map.rotation = Math.PI;
            alphaTextureBack = this.alphaTextureBack;
        }
        const frontMaterial = new THREE.MeshBasicMaterial(Object.assign(Object.assign({}, frontMaterialProps), { wireframe: false, side: THREE.FrontSide, alphaMap: this.alphaTexture, transparent: true }));
        const backMaterial = new THREE.MeshBasicMaterial(Object.assign(Object.assign({}, backMaterialProps), { wireframe: false, side: THREE.BackSide, alphaMap: alphaTextureBack, transparent: true }));
        const geometry = new THREE.PlaneGeometry(width, height, widthSegments, 1);
        this.adjustGeometryLeft(geometry, width / 2 + axisOffset);
        this.frontMesh = new THREE.Mesh(geometry, frontMaterial);
        this.backMesh = new THREE.Mesh(geometry, backMaterial);
        [this.frontMesh, this.backMesh].forEach((mesh) => this.object3d.add(mesh));
    }
    setSide(side) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.state.side === 'transition' || this.state.side === side) {
                return this;
            }
            this.state = Object.assign(Object.assign({}, this.state), { side: 'transition' });
            const newSide = yield this.onUpdateSide(side);
            this.state = Object.assign(Object.assign({}, this.state), { side: newSide });
            return this;
        });
    }
    prepareSetSide(side) {
        const task = this.prepareSetSideTask(side);
        return () => __awaiter(this, void 0, void 0, function* () {
            this.state = Object.assign(Object.assign({}, this.state), { side: 'transition' });
            const newSide = yield task();
            this.state = Object.assign(Object.assign({}, this.state), { side: newSide });
        });
    }
    static prepareSetSide(side, sheets) {
        return Sheet.animationQueuer.mergeParallelTasks(Array.from(sheets).map((sheet) => sheet.prepareSetSide(side)));
    }
    static setSide(side, sheets) {
        return __awaiter(this, void 0, void 0, function* () {
            const [task, latch] = Sheet.prepareSetSide(side, sheets);
            Sheet.animationQueuer.queue(task);
            return yield latch;
        });
    }
    onUpdateMaterial(material, view) {
        if ((0, definitions_1.isImagePath)(view)) {
            material.map = this.loader.load(view);
        }
        else {
            material.map = null;
            material.color = new THREE.Color(view);
        }
    }
    onUpdateFrontPage(frontPage) {
        const material = this.frontMesh.material;
        this.onUpdateMaterial(material, frontPage);
    }
    onUpdateBackPage(backPage) {
        const material = this.backMesh.material;
        this.onUpdateMaterial(material, backPage);
    }
    onUpdateSide(side) {
        return __awaiter(this, void 0, void 0, function* () {
            if (side === 'right') {
                yield this.state.rotationY.set(0);
            }
            else {
                yield this.state.rotationY.set(-Math.PI);
            }
            return side;
        });
    }
    prepareSetSideTask(side) {
        if (side === 'right') {
            const { task } = this.state.rotationY.prepare(0)[0];
            return () => __awaiter(this, void 0, void 0, function* () {
                yield task();
                return side;
            });
        }
        else {
            const { task } = this.state.rotationY.prepare(-Math.PI)[0];
            return () => __awaiter(this, void 0, void 0, function* () {
                yield task();
                return side;
            });
        }
    }
    render(_) {
        this.object3d.rotation.y = this.state.rotationY.value;
    }
    // Heplers
    adjustGeometryLeft(geometry, axisOffset) {
        const position = geometry.attributes['position'];
        const newPositionArray = new Float32Array(position.array);
        for (let i = 0; i < position.array.length; i += position.itemSize) {
            newPositionArray[i + 0] += axisOffset;
        }
        geometry.setAttribute('position', new THREE.BufferAttribute(newPositionArray, position.itemSize));
    }
}
exports.Sheet = Sheet;
Sheet.animationQueuer = (0, services_1.useAnimation)().queuer;
