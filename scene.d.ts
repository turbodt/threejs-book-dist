import * as THREE from 'three';
import type { TouchManagerEvent } from 'threejs-screen-input-manager';
import { Book } from './book';
import { Camera } from './camera';
import { Object3DComponent } from './object3d-component';
import { FrontButtons } from './front-buttons';
import { Lights } from './lights';
import { Color, OnChangeViewMiddleware } from './definitions';
export interface ISceneProps {
    renderer: THREE.Renderer;
    pages?: string[];
    viewIndex?: number;
    backgroundColor?: Color;
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
    middleware?: {
        onChangeView?: OnChangeViewMiddleware;
    };
    transitions?: {
        page?: {
            duration: number;
        };
    };
}
export interface ISceneState {
    camera: Camera;
    book: Book;
    frontButtons?: FrontButtons;
    lights: Lights;
    rBookWidth: number;
    aspectRatio: number;
}
export declare class Scene extends Object3DComponent<ISceneProps, ISceneState> {
    protected isFirstFrame: boolean;
    protected __object3d: THREE.Scene;
    get object3d(): THREE.Scene;
    get backgroundColor(): THREE.Color;
    get book(): Book;
    protected set backgroundColor(color: Color);
    getInitialState(): ISceneState;
    onInit(): void;
    update(newProps: Partial<ISceneProps>): void;
    protected scaleGroup(): void;
    protected onFirstFrame(): void;
    render(renderer: THREE.Renderer): void;
}
