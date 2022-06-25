import * as THREE from 'three';
import { TaskQueuer, TransitionalValue } from './utils';
import { Object3DComponent } from './object3d-component';
declare type Side = 'left' | 'right';
declare type SideStatus = Side | 'transition';
export interface ISheetProps {
    frontPage: string;
    backPage: string;
    isCover?: boolean;
    side?: Side;
    axisOffset?: number;
    transition?: {
        duration: number;
    };
}
interface ISheetState {
    side: SideStatus;
    rotationY: TransitionalValue<number>;
    isCover: boolean;
    frontPage: string;
    backPage: string;
}
export declare class Sheet extends Object3DComponent<ISheetProps, ISheetState> {
    static animationQueuer: TaskQueuer;
    protected aspectRatio: number;
    protected alphaTexture: THREE.Texture;
    protected alphaTextureBack: THREE.Texture;
    protected frontMesh: THREE.Mesh;
    protected backMesh: THREE.Mesh;
    protected loader: THREE.TextureLoader;
    get side(): SideStatus;
    get frontPage(): string;
    set frontPage(frontPage: string);
    get backPage(): string;
    set backPage(backPage: string);
    get z(): number;
    set z(z: number);
    constructor();
    getInitialState(): ISheetState;
    onInit(): void;
    setSide(side: Side): Promise<Sheet>;
    prepareSetSide(side: Side): () => Promise<void>;
    static prepareSetSide(side: Side, sheets: Iterable<Sheet>): [() => Promise<void>, Promise<void>];
    static setSide(side: Side, sheets: Iterable<Sheet>): Promise<void>;
    protected onUpdateMaterial(material: THREE.MeshBasicMaterial, view: string): void;
    onUpdateFrontPage(frontPage: string): void;
    onUpdateBackPage(backPage: string): void;
    onUpdateSide(side: Side): Promise<Side>;
    protected prepareSetSideTask(side: Side): () => Promise<Side>;
    render(_: THREE.Renderer): void;
    protected adjustGeometryLeft(geometry: THREE.BufferGeometry, axisOffset: number): void;
}
export {};
