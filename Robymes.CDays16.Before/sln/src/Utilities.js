jQuery.ajax = function (response) {
    var deferred = jQuery.Deferred().resolve(response);
    return deferred.promise();
};