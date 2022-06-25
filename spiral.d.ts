import * as THREE from 'three';
import { Object3DComponent } from './object3d-component';
export interface ISpiralProps {
    rRadius: number;
}
export interface ISpiralState {
}
export declare class Spiral extends Object3DComponent<ISpiralProps, ISpiralState> {
    onCreation(): void;
    protected getGeometry(): THREE.BufferGeometry;
}
