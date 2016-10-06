declare namespace cdays16 {
    interface ApiService {  
    }

    interface ToDoListViewModel {
        errorMessage: KnockoutObservable<string>;
        init: () => void;
    }

    interface CDays16Static {
        ApiService: () => ApiService;
        ToDoListViewModel: (apiService: ApiService) => ToDoListViewModel;
    }
}

declare module "cdays16" {
    var cdays16: cdays16.CDays16Static;
    export = cdays16;
}

declare module "cdays16/cdays16" {
    var cdays16: cdays16.CDays16Static;
    export = cdays16;
}

declare var cdays16: cdays16.CDays16Static;