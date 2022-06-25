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
exports.Object3DComponent = void 0;
const THREE = __importStar(require("three"));
const meta_1 = require("./meta");
class Object3DComponent extends meta_1.Component {
    constructor() {
        super();
        this.__object3d = new THREE.Group();
    }
    get object3d() {
        return this.__object3d;
    }
    set object3d(object3d) {
        const currentParent = this.object3d.parent;
        const currentChildren = this.object3d.children;
        if (currentParent !== null) {
            this.object3d.removeFromParent();
            currentParent.add(object3d);
        }
        currentChildren.forEach((child) => {
            child.removeFromParent();
            object3d.add(child);
        });
        this.__object3d = object3d;
    }
    render(renderer) {
        this.children.forEach((child) => child instanceof Object3DComponent && child.render(renderer));
    }
    onAttach(child) {
        if (child instanceof Object3DComponent) {
            this.object3d.add(child.object3d);
        }
    }
    onDetach(child) {
        if (child instanceof Object3DComponent) {
            this.object3d.remove(child.object3d);
        }
    }
}
exports.Object3DComponent = Object3DComponent;
