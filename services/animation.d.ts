import { TaskQueuer, TransitionalValue, ITransitionalValueProps } from '../utils';
export interface IUseAnimationResult {
    queuer: TaskQueuer;
}
export declare const useAnimation: () => IUseAnimationResult;
export declare type IUseTranstionResult<T> = TransitionalValue<T>;
export declare const useTransition: <T>(current: T, props: ITransitionalValueProps<T>) => IUseTranstionResult<T>;
