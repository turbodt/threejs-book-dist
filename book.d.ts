import { Object3DComponent } from './object3d-component';
import { Sheet } from './sheet';
import { TaskQueuer, TransitionalValue } from './utils';
import { OnChangeViewMiddleware } from './definitions';
export interface IBookProps {
    pages?: string[];
    viewIndex?: number;
    rSeparation?: number;
    spiral: {
        rRadius: number;
    };
    middleware?: {
        onChangeView?: OnChangeViewMiddleware;
    };
    transition?: {
        duration: number;
    };
}
export interface IBookState {
    viewIndex: number;
    sheets: Sheet[];
    translationX: TransitionalValue<number>;
}
export declare class Book extends Object3DComponent<IBookProps, IBookState> {
    protected aspectRatio: number;
    protected readonly sheetThickness = 0.001;
    protected animationQueuer: TaskQueuer;
    protected translationXOffset: number;
    constructor();
    onCreation(): void;
    update(newProps: Partial<IBookProps>): void;
    get viewIndex(): number;
    protected setViewIndex(nextViewIndex: number): Promise<void>;
    get sheetIndex(): number;
    protected get numSheetsLeft(): number;
    protected get numSheetsRight(): number;
    get sheets(): Sheet[];
    setView(requestedViewIndex: number): void;
    setPage(nextPage: number): void;
    onInit(): void;
    protected updateViewIndex(targetViewIndex: number): Promise<number>;
    protected translationXValueForViewIndex(viewIndex: number): number;
    protected translationXAnimationIfNeeded(currentViewIndex: number, viewIndex: number): Promise<void>;
    protected sheetSide(sheetIndex: number, viewIndex: number): 'left' | 'right';
    protected getLeftThickness(_: Sheet[], viewIndex: number): number;
    protected getRightThickness(sheets: Sheet[], viewIndex: number): number;
    protected setSheetsZ(sheets: Sheet[]): void;
    protected getPagePairs(pages: string[]): [string, string][];
    protected buildSheets(pages: string[]): Sheet[];
    render(renderer: THREE.Renderer): void;
}
