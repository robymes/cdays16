/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../sln/src/jsDecs.d.ts" />

import * as ref from "../sln/src/NewToDoItemViewModel";

class FakeApiService implements cdays16.ApiService {
}

describe("Dato il viewmodel del nuovo item", () => {
    let apiService: FakeApiService;
    let newToDoItemViewModel: ref.NewToDoItemViewModel;

    beforeEach(() => {
        newToDoItemViewModel = new ref.NewToDoItemViewModel(apiService);
    });

    it("quando creato le sue proprietà sono vuote", () => {
        expect(newToDoItemViewModel.title()).toEqual("");
        expect(newToDoItemViewModel.description()).toEqual("");
        expect(newToDoItemViewModel.canInsertNewItem()).toEqual(false);
    });

});