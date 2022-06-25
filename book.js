"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const object3d_component_1 = require("./object3d-component");
const sheet_1 = require("./sheet");
const spiral_1 = require("./spiral");
const services_1 = require("./services");
class Book extends object3d_component_1.Object3DComponent {
    constructor() {
        super();
        this.aspectRatio = 1.4142;
        this.sheetThickness = 0.001;
        const { queuer } = (0, services_1.useAnimation)();
        this.animationQueuer = queuer;
        this.translationXOffset = this.aspectRatio / 4;
        window.book = {
            goTo: (i) => this.setView(i),
            next: () => this.setView(this.viewIndex + 1),
            prev: () => this.setView(this.viewIndex - 1),
        };
    }
    onCreation() {
        var _a;
        this.translationXOffset =
            this.aspectRatio / 4 + (((_a = this.props) === null || _a === void 0 ? void 0 : _a.rSeparation) || 0) / 2;
        spiral_1.Spiral.create(Object.assign({}, this.props.spiral), [], this);
    }
    update(newProps) {
        if (newProps.pages !== undefined) {
            // TODO
        }
        if (newProps.viewIndex !== undefined) {
            this.setView(newProps.viewIndex);
        }
    }
    get viewIndex() {
        return this.state.viewIndex;
    }
    setViewIndex(nextViewIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            if (nextViewIndex < 0) {
                nextViewIndex = 0;
            }
            else if (nextViewIndex >= this.sheets.length + 1) {
                nextViewIndex = this.sheets.length;
            }
            if (nextViewIndex === this.state.viewIndex) {
                return;
            }
            yield this.updateViewIndex(nextViewIndex);
        });
    }
    get sheetIndex() {
        return Math.floor(this.viewIndex / 2);
    }
    get numSheetsLeft() {
        return this.viewIndex;
    }
    get numSheetsRight() {
        return this.sheets.length - this.numSheetsLeft;
    }
    get sheets() {
        return this.state.sheets;
    }
    setView(requestedViewIndex) {
        var _a;
        const next = () => __awaiter(this, void 0, void 0, function* () {
            yield this.setViewIndex(requestedViewIndex);
            return this.viewIndex;
        });
        if ((_a = this.props.middleware) === null || _a === void 0 ? void 0 : _a.onChangeView) {
            this.props.middleware.onChangeView({
                currentViewIndex: this.viewIndex,
                requestedViewIndex,
                next,
            });
        }
        else {
            next();
        }
    }
    setPage(nextPage) {
        return this.setView(Math.floor((nextPage + 1) / 2));
    }
    onInit() {
        var _a;
        const { viewIndex = 0, pages = [] } = this.props;
        const translationX = (0, services_1.useTransition)(0, {
            parametrization: (t, a, b) => a + t * (b - a),
            defaultDuration: ((_a = this.props.transition) === null || _a === void 0 ? void 0 : _a.duration) || 1000,
        });
        this.state = { viewIndex, sheets: [], translationX };
        const sheets = this.buildSheets(pages);
        this.state = Object.assign(Object.assign({}, this.state), { sheets });
        if (viewIndex === 0) {
            this.state.translationX.setImmediately(-this.translationXOffset);
        }
    }
    updateViewIndex(targetViewIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            const maxDistance = 3;
            const currentViewIndex = this.viewIndex;
            const numSheetsLeft = currentViewIndex;
            const distance = Math.abs(targetViewIndex - currentViewIndex);
            if (distance === 0) {
                return targetViewIndex;
            }
            const nextViewIndex = distance > maxDistance
                ? targetViewIndex
                : currentViewIndex < targetViewIndex
                    ? currentViewIndex + 1
                    : currentViewIndex - 1;
            const involvedSheets = currentViewIndex < nextViewIndex
                ? this.sheets.slice(numSheetsLeft, numSheetsLeft + nextViewIndex - currentViewIndex)
                : this.sheets
                    .slice(numSheetsLeft + nextViewIndex - currentViewIndex, numSheetsLeft)
                    .reverse();
            const side = currentViewIndex < nextViewIndex ? 'left' : 'right';
            yield this.translationXAnimationIfNeeded(currentViewIndex, nextViewIndex);
            yield sheet_1.Sheet.setSide(side, involvedSheets);
            this.state = Object.assign(Object.assign({}, this.state), { viewIndex: nextViewIndex });
            return yield this.updateViewIndex(targetViewIndex);
        });
    }
    // Helpers
    translationXValueForViewIndex(viewIndex) {
        if (viewIndex === 0) {
            return -this.translationXOffset;
        }
        else if (viewIndex === this.sheets.length) {
            return this.translationXOffset;
        }
        return 0;
    }
    translationXAnimationIfNeeded(currentViewIndex, viewIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentTranslationXValue = this.translationXValueForViewIndex(currentViewIndex);
            const translationXValue = this.translationXValueForViewIndex(viewIndex);
            if (currentTranslationXValue === translationXValue) {
                return;
            }
            else {
                yield this.state.translationX.set(translationXValue);
            }
        });
    }
    sheetSide(sheetIndex, viewIndex) {
        return viewIndex > sheetIndex ? 'left' : 'right';
    }
    getLeftThickness(_, viewIndex) {
        const numSheetsLeft = viewIndex;
        return Math.max(0, this.sheetThickness * (numSheetsLeft - 1));
    }
    getRightThickness(sheets, viewIndex) {
        const numSheetsRight = sheets.length - viewIndex;
        return Math.max(0, this.sheetThickness * (numSheetsRight - 1));
    }
    setSheetsZ(sheets) {
        const offsetRight = ((sheets.length - 1) * this.sheetThickness) / 2;
        sheets.forEach((sheet, sheetIndex) => {
            sheet.z = -sheetIndex * this.sheetThickness + offsetRight;
        });
    }
    getPagePairs(pages) {
        const pagePairs = [];
        for (let i = 0; i < pages.length; i += 2) {
            pagePairs.push([
                pages[i],
                pages[i + 1] || pages[i],
            ]);
        }
        return pagePairs;
    }
    buildSheets(pages) {
        const pagePairs = this.getPagePairs(pages);
        const sheets = pagePairs.map(([frontPage, backPage], sheetIndex) => sheet_1.Sheet.create({
            side: this.sheetSide(sheetIndex, this.viewIndex),
            isCover: sheetIndex === 0 || sheetIndex + 1 === pagePairs.length,
            axisOffset: this.props.rSeparation || 0,
            frontPage,
            backPage,
            transition: this.props.transition,
        }, [], this));
        this.setSheetsZ(sheets);
        return sheets;
    }
    render(renderer) {
        this.object3d.position.x = this.state.translationX.value;
        super.render(renderer);
    }
}
exports.Book = Book;
