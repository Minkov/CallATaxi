/// <reference path="http-request.js" />
var app = app || {};
(function (a) {

    function getGeolocation() {
        var promise = new RSVP.Promise(function (resolve, reject) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        return promise;
    }

    a.helpers = {
        getGeolocation: getGeolocation
    };
}(app));