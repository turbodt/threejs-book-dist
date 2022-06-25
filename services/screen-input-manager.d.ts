import * as THREE from 'three';
import { TouchManager, MouseManager } from 'threejs-screen-input-manager';
export declare const useScreenInputManager: () => {
    touchManager: TouchManager;
    mouseManager: MouseManager;
}, initializeScreenInputManager: (canvas: HTMLCanvasElement, camera: THREE.Camera) => void;
