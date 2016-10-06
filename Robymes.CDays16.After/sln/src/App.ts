/// <reference path="jsDecs.d.ts" />

import * as vm from "./ViewModel";

export class App {
    static init(): void {
        let apiService = cdays16.ApiService();
        let viewModel = new vm.ViewModel(apiService);
        ko.applyBindings(viewModel);
        viewModel.init();
    };
}

jQuery(document).ready(() => {
    App.init();
});