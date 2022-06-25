import * as THREE from 'three';
export declare type ImagePath = string;
export declare const isImagePath: (obj: any) => obj is string;
export declare type Color = number | string | THREE.Color;
export declare const isColor: (obj: any) => obj is Color;
export declare type OnChangeViewMiddleware = (args: {
    currentViewIndex: number;
    requestedViewIndex: number;
    next: () => Promise<number>;
}) => void | Promise<void>;
