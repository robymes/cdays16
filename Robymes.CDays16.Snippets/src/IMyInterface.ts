namespace cdays16 {
    export enum myEnum {
        first,
        second
    };

    export interface IMyInterface<T> {
        myProperty: myEnum;

        myFunction(): number[];
        myGenericFunction<T>(): T[];
    };
}