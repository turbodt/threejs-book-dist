import * as THREE from 'three';
import type { TouchManagerEvent } from 'threejs-screen-input-manager';
import { Color, OnChangeViewMiddleware } from './definitions';
import { Component } from './meta';
import { Scene } from './scene';
export interface IThreeBookProps {
    canvas: HTMLCanvasElement;
    pages: string[];
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
export interface IThreeBookState {
    scene: Scene;
    renderer: THREE.WebGLRenderer;
    render: () => void;
}
export declare class ThreeBook extends Component<IThreeBookProps, IThreeBookState> {
    protected dpr: number;
    protected isAnimationRunning: boolean;
    protected requestAnimationFrameId: number | undefined;
    setView(nextViewIndex: number): void;
    setPage(nextPage: number): void;
    getInitialState(): IThreeBookState;
    update(newProps: Partial<IThreeBookProps>): void;
    protected onResizeHandler(renderer: THREE.WebGLRenderer): void;
    protected createRenderer(canvas: HTMLCanvasElement): THREE.WebGLRenderer;
    protected createScene(renderer: THREE.WebGLRenderer): Scene;
    protected createRender(renderer: THREE.WebGLRenderer, scene: Scene): () => void;
    animate(): {
        start: () => void;
        stop: () => void;
    };
    delete(): Component<IThreeBookProps, IThreeBookState>;
}
