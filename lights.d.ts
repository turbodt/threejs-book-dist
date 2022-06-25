import * as THREE from 'three';
import { Object3DComponent } from './object3d-component';
export interface IUseLightsProps {
}
export declare class Lights extends Object3DComponent<IUseLightsProps> {
    onInit(): void;
    protected createPoinLight(color: number): THREE.PointLight;
}
