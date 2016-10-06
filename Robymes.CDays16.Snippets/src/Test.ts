/// <reference path="./IMyInterface.ts" />
/// <reference path="./MyClass.ts" />

namespace cdays16 {
    MyClass.myStaticProperty = {};
    let myObject = new MyClass();
    let property = myObject.myProperty;
    let result = myObject.myFunction();
}