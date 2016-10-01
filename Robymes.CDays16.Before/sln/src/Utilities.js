this.cdays16 = (function (cdays16) {
    jQuery.ajax = function (response) {
        var deferred = jQuery.Deferred().resolve(response);
        return deferred.promise();
    };
    return cdays16;
}(this.cdays16 || {}));