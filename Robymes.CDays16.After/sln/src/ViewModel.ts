/// <reference path="jsDefs.d.ts" />
import * as n from "./NewToDoItemViewModel";

export class ViewModel {
    toDoList: cdays16.ToDoListViewModel;
    newToDoItem: n.NewToDoItemViewModel;

    constructor(apiService: cdays16.ApiService) {
        this.toDoList = cdays16.ToDoListViewModel(apiService);
        this.newToDoItem = new n.NewToDoItemViewModel();
    }

    init() {
        this.toDoList.init();
    };
}