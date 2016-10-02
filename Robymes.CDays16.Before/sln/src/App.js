this.cdays16 = (function (cdays16) {
    jQuery(document).ready(function () {
        var apiService = new cdays16.ApiService(),
            toDoListViewModel = new cdays16.ToDoListViewModel(apiService);
        ko.applyBindings(toDoListViewModel, document.getElementById("toDoList"));
        toDoListViewModel.init();
    });
}(this.cdays16 || {}));