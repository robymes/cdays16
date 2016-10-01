this.cdays16 = (function (cdays16) {
    jQuery(document).ready(function () {
        var apiService = new cdays16.ApiService(),
            viewModel = {
                toDoList: new cdays16.ToDoListViewModel(apiService)
            };
        ko.applyBindings(viewModel);
        viewModel.toDoList.init();
    });
}(this.cdays16 || {}));