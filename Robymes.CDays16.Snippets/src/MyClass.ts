/// <reference path="../typings/tsd.d.ts" />
/// <reference path="./IMyInterface.ts" />

namespace cdays16 {
    export class MyClass implements IMyInterface<number> {
        static myStaticProperty: any;
        private myPrivateProperty: number | string;
        myProperty: myEnum;

        constructor() {
            this.myPrivateProperty = "Hello!";
            this.myProperty = myEnum.first;
        };

        myFunction(): number[] {
            return Enumerable.Range(0, 5)
                .ToArray();
        };

        myGenericFunction(): number[] {
            return Enumerable.Range(0, 5)
                .ToArray();
        };
    }
}