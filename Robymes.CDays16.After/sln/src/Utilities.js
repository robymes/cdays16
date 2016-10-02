jQuery.ajax = function (response) {
    var deferred = jQuery.Deferred().resolve(response);
    return deferred.promise();
};

ko.bindingHandlers.datepicker = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var options = allBindingsAccessor().datepickerOptions || {
                language: "it",
                format: "dd/mm/yyyy",
                startDate: moment().add(1, "d").toDate(),
                clearBtn: true,
                todayBtn: "linked",
                autoclose: true,
                todayHighlight: true
            },
            initialMoment = valueAccessor();
        $(element).datepicker(options);
        $(element).datepicker("setDate", initialMoment().toDate());
        ko.utils.registerEventHandler(element, "changeDate", function (event) {
            var value = valueAccessor();
            if (ko.isObservable(value)) {
                value(moment(event.date));
            }
        });
        ko.utils.registerEventHandler(element, "clearDate", function (event) {
            var value = valueAccessor();
            if (ko.isObservable(value)) {
                value(null);
            }
        });
    },
    update: function (element, valueAccessor) {
        var widget = $(element).data("datepicker"),
            val;
        if (widget) {
            val = ko.utils.unwrapObservable(valueAccessor());
            widget.date = val ? val.toDate() : null;
            widget.setValue();
        }
    }
};