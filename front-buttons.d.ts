import * as THREE from 'three';
import type { TouchManagerEvent } from 'threejs-screen-input-manager';
import { Object3DComponent } from './object3d-component';
import { Button } from './button';
import { Color } from './definitions';
export interface IFrontButtonsProps {
    arrows?: {
        visible?: boolean;
        color?: Color;
        right?: {
            callback?: (event: TouchManagerEvent) => void;
            color?: Color;
        };
        left?: {
            callback?: (event: TouchManagerEvent) => void;
            color?: Color;
        };
    };
    sceneAspectRatio: number;
}
export interface IFrontButtonsState {
    leftButton?: Button;
    rightButton?: Button;
}
export declare class FrontButtons extends Object3DComponent<IFrontButtonsProps, IFrontButtonsState> {
    getInitialState(): IFrontButtonsState;
    onInit(): void;
    protected getLeftMaterial(): THREE.Material;
    protected getRightMaterial(): THREE.Material;
    protected getGeometry(): THREE.BufferGeometry;
    protected getLeftColor(): THREE.Color;
    protected getRightColor(): THREE.Color;
}
