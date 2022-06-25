import * as THREE from 'three';
import { MouseManager, TouchManager, TouchManagerEvent } from 'threejs-screen-input-manager';
import { Object3DComponent } from './object3d-component';
export interface IButtonProps {
    onClick?: (event: TouchManagerEvent) => void;
    geometry?: THREE.BufferGeometry;
    material?: THREE.Material;
}
export interface IButonState {
}
export declare class Button extends Object3DComponent<IButtonProps, IButonState> {
    protected touchManager: TouchManager;
    protected mouseManager: MouseManager;
    get object3d(): THREE.Mesh;
    set object3d(mesh: THREE.Mesh);
    constructor();
    onCreation(): void;
    protected getDefaultGeometry(): THREE.BufferGeometry;
    protected getDefaultMaterial(): THREE.Material;
}
