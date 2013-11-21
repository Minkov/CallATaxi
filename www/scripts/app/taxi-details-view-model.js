var app = app || {};

(function (a) {
    var _view;
    var viewModel = kendo.observable({
        taxi: {
            id: -1,
            name: "",
            telephone: "",
            getPhoneString: "",
            callTelephone: "",
            website: "",
            description: "",
            likes: 0,
            dislikes: 0,
            fares: [],
            taxiLikedClass: "",
            taxiDislikedClass: "",
            callPhone: function () {
                return "tel:" + viewModel.get("taxi.telephone");
            }
        },
        like: function () {
            var self = viewModel;
            var id = self.get("taxi.id");
            httpRequest.putJSON(app.servicesUrl + "taxis/" + id + "/like", {}, { "x-phoneId": window.phoneId })
            .then(function () {
                httpRequest.getJSON(a.servicesUrl + "taxis/" + viewModel.get("taxi.id"), { "x-phoneId": window.phoneId })
                .then(onTaxiLoaded, onTaxiLoadedError);
            });
        },
        dislike: function () {
            var self = viewModel;
            var id = self.get("taxi.id");
            httpRequest.putJSON(app.servicesUrl + "taxis/" + id + "/dislike", {}, { "x-phoneId": window.phoneId })
            .then(function () {
                httpRequest.getJSON(a.servicesUrl + "taxis/" + viewModel.get("taxi.id"), { "x-phoneId": window.phoneId })
                .then(onTaxiLoaded, onTaxiLoadedError);
            });
        },
        viewComments: function () {
            viewModel.set("taxi.commentsCount", viewModel.get("taxi.comments").length);
        }
    });

    function onTaxiLoaded(taxi) {
        var self = viewModel;
        var fares = [
            {
                type: "Per km",
                costs: {
                    daily: taxi.DailyKmFare.toFixed(2),
                    nightly: taxi.NightlyKmFare.toFixed(2)
                }
            }, {
                type: "Booking",
                costs: {
                    daily: taxi.DailyBookingFare.toFixed(2),
                    nightly: taxi.NightlyBookingFare.toFixed(2)
                }
            }, {
                type: "Initial",
                costs: {
                    daily: taxi.DailyInitialFare.toFixed(2),
                    nightly: taxi.NightlyInitialFare.toFixed(2)
                }
            }, {
                type:
                "Per minute",
                costs
                : {
                    daily: taxi.DailyMinFare.toFixed(2),
                    nightly: taxi.NightlyMinFare.toFixed(2)
                }
            }
        ];
        self.set("taxi.id", taxi.Id);
        self.set("taxi.name", taxi.Name);
        self.set("taxi.description", taxi.Description);
        self.set("taxi.telephone", taxi.Telephone);
        self.set("taxi.callTelephone", "tel:" + taxi.Telephone);
        self.set("taxi.getPhoneString", "Call " + taxi.Telephone);
        self.set("taxi.website", taxi.Website);

        self.set("taxi.likes", taxi.Likes);
        self.set("taxi.dislikes", taxi.Dislikes);
        self.set("taxi.fares", fares);

        self.set("taxi.taxiLikedClass", (taxi.Liked === true) ? "disabled" : "");
        self.set("taxi.taxiDislikedClass", (taxi.Disliked === true) ? "disabled" : "");
        self.set("taxi.liked", taxi.Liked);
        self.set("taxi.disliked", taxi.Disliked);
    }

    function onTaxiLoadedError(err) {
        notification.alert(err);
    }

    function init(e) {
        _e = e;
        kendo.bind(e.view.element, viewModel);
        var taxiId = e.view.params.taxiId;
        httpRequest.getJSON(a.servicesUrl + "taxis/" + taxiId, { "x-phoneId": window.phoneId })
        .then(onTaxiLoaded, onTaxiLoadedError);
    }

    a.taxiDetails = {
        init: init
    };
}(app));