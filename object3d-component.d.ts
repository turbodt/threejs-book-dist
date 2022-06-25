import * as THREE from 'three';
import { Component } from './meta';
export declare abstract class Object3DComponent<Props extends {} = {}, State extends {} = {}> extends Component<Props, State> {
    protected __object3d: THREE.Object3D;
    get object3d(): THREE.Object3D;
    set object3d(object3d: THREE.Object3D);
    constructor();
    render(renderer: THREE.Renderer): void;
    onAttach(child: Component): void;
    onDetach(child: Component): void;
}
