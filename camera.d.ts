import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Object3DComponent } from './object3d-component';
export interface ICameraProps {
    renderer: THREE.Renderer;
}
export interface ICameraState {
    controls: OrbitControls;
}
export declare class Camera extends Object3DComponent<ICameraProps, ICameraState> {
    protected __object3d: THREE.PerspectiveCamera;
    protected raycaster: THREE.Raycaster;
    protected planeNormal: THREE.Vector3;
    protected plane: THREE.Plane;
    get object3d(): THREE.PerspectiveCamera;
    get controls(): OrbitControls;
    onInit(): void;
    getViewSizeAtPlane: (w?: number) => [number, number];
    render(renderer: THREE.Renderer): void;
}
