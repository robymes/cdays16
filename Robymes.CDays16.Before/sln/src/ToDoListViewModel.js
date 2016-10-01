this.cdays16 = (function (cdays16) {
    cdays16.ToDoListViewModel = function (apiService) {
        var self = this;

        self.items = ko.observableArray([]);
        self.errorMessage = ko.observable("");

        self.init = function () {
            self.errorMessage("");
            apiService.loadTodoItems()
                .then(function (items) {
                    self.items.removeAll();
                    self.items(items);
                })
                .fail(function (error) {
                    self.errorMessage("ATTENZIONE: errore durante il caricamento della lista.");
                });
        };
    };
    return cdays16;
}(this.cdays16 || {}));