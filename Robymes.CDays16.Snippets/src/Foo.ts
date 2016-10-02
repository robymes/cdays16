namespace cdays16 {
    export class Foo implements IFoo {
        bar(): number[] {
            return Enumerable.Range(0, 5)
                .ToArray();
        };
    }
}