import * as THREE from 'three';
export interface IBorderAlphaTextureProps {
    radius?: number;
}
export declare type IBorderAlphaTextureResult = [
    THREE.CanvasTexture,
    THREE.CanvasTexture
];
export declare const useBorderAlphaTexture: ({ radius, }?: IBorderAlphaTextureProps) => IBorderAlphaTextureResult;
