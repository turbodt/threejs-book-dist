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
exports.useBorderAlphaTexture = void 0;
const THREE = __importStar(require("three"));
exports.useBorderAlphaTexture = (() => {
    const canvas = document.createElement('canvas');
    const canvasBack = document.createElement('canvas');
    const canvasSize = 1000;
    const cWidth = canvasSize * 1;
    const cHeight = canvasSize * 1.4142;
    canvas.setAttribute('width', `${cWidth}`);
    canvas.setAttribute('height', `${cHeight}`);
    canvasBack.setAttribute('width', `${cWidth}`);
    canvasBack.setAttribute('height', `${cHeight}`);
    const context = canvas.getContext('2d');
    const contextBack = canvasBack.getContext('2d');
    contextBack.transform(-1, 0, 0, 1, cWidth, 0);
    let currentRadius = 0.025;
    let texture;
    let textureBack;
    const useBorderAlphaTexture = ({ radius = currentRadius, } = {}) => {
        if (radius !== currentRadius || texture === undefined) {
            const borderRadius = radius * canvasSize;
            currentRadius = radius;
            [context, contextBack].forEach((context) => {
                context.clearRect(0, 0, cWidth, cHeight);
                context.fillStyle = 'black';
                context.fillRect(0, 0, cWidth, cHeight);
                context.fillStyle = 'white';
                context.moveTo(0, cHeight);
                context.lineTo(cWidth - borderRadius, cHeight);
                context.quadraticCurveTo(cWidth, cHeight, cWidth, cHeight - borderRadius);
                context.lineTo(cWidth, 0 + borderRadius);
                context.quadraticCurveTo(cWidth, 0, cWidth - borderRadius, 0);
                context.lineTo(0, 0);
                context.fill();
            });
            texture = new THREE.CanvasTexture(canvas);
            textureBack = new THREE.CanvasTexture(canvasBack);
        }
        return [texture, textureBack];
    };
    return useBorderAlphaTexture;
})();
