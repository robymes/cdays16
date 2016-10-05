this.cdays16 = (function (cdays16) {
    jQuery(document).ready(function () {
        var apiService = cdays16.ApiService(),
            viewModel = {
                toDoList: cdays16.ToDoListViewModel(apiService)
            };
        ko.applyBindings(viewModel);
        viewModel.toDoList.init();
    });
    return cdays16;
}(this.cdays16 || {}));