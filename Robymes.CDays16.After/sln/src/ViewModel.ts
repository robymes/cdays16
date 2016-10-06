/// <reference path="jsDecs.d.ts" />

import * as ref from "./NewToDoItemViewModel";

export class ViewModel {
    toDoList: cdays16.ToDoListViewModel;
    newToDoItem: ref.NewToDoItemViewModel;

    constructor(apiService: cdays16.ApiService) {
        this.toDoList = cdays16.ToDoListViewModel(apiService);
        this.newToDoItem = new ref.NewToDoItemViewModel(apiService);
    }

    init() {
        this.toDoList.init();
    };
}