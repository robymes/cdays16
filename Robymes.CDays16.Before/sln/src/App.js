this.cdays16 = (function(cdays16) {
    jQuery(document).ready(function() {
        var viewModel = {
            toDoList: new cdays16.ToDoListViewModel()
        };
        ko.applyBindings(viewModel);
    });
})(this.cdays16 || {});