/// <reference path="taxi-details-view-model.js" />
var app = app || {};

(function (a) {
    var viewModel = kendo.observable({
        cities: [],
        city: {},
        taxis: [],
        location: { lat: 0, long: 0 },
        onCityChanged: function (e) {
            var cityId = e.target.value;
            httpRequest.getJSON(app.servicesUrl + "cities/" + cityId)
                .then(function (city) {
                    viewModel.set("city", city);
                    viewModel.set("taxis", city.Taxis);
                });
        }
    });

    function init(e) {
        kendo.bind(e.view.element, viewModel);
        //app.helpers.getGeolocation()
        //    .then(function (position) {
                //viewModel.set("location.lat", position.coords.latitude);
                //viewModel.set("location.long", position.coords.longitude);

        //return 
        //httpRequest.getJSON(app.servicesUrl + "cities");
        //})
        httpRequest.getJSON(app.servicesUrl + "cities")
        .then(function (cities) {
            viewModel.set("cities", cities);
            return httpRequest.getJSON(app.servicesUrl + "cities/" + cities[0].Id);
        })
        .then(function (city) {
            viewModel.set("city", city);
            viewModel.set("taxis", city.Taxis);
        });
    }

    a.cities = {
        init: init
    };
}(app));