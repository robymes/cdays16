this.cdays16 = (function (cdays16) {
    cdays16.ApiService = function () {
        var self =this;

        self.loadTodoItems = function () {
            var items =
                Enumerable.cycle({
                    title: "Star Wars Rogue One",
                    description: "Hype a mille",
                    dueDate: moment()
                })
                .take(1)
                .union(
                    Enumerable.cycle({
                        title: "Todo ",
                        description: "This is the Todo #",
                        dueDate: moment()
                    })
                    .take(5)
                    .select(function (item, i) {
                        var index = i += 1;
                        return {
                            title: item.title + index,
                            description: item.description + index,
                            dueDate: item.dueDate
                        };
                    })
                )
                .toArray();
            return jQuery.ajax(items);
        };
    };
    return cdays16;
}(this.cdays16 || {}));