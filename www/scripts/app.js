/// <reference path="_refference.js" />

var app = app || {};

(function() {
    document.addEventListener("deviceready", function () {
        app.servicesUrl = "http://callataxi.apphb.com/api/";
        //app.servicesUrl = "http://taxiornot.apphb.com/api/";
        //app.servicesUrl = "http://localhost:60415/api/";
        new kendo.mobile.Application();
        httpRequest.getJSON(app.servicesUrl + "init")
            .then(function (data) {
                notification.alert(data)
            });
        loadUserInfo();


        //app.servicesUrl = "http://callataxi.apphb.com/api/";
        ////app.servicesUrl = "http://taxiornot.apphb.com/api/";
        ////app.servicesUrl = "http://localhost:60415/api/";
        //new kendo.mobile.Application();
        //httpRequest.getJSON(app.servicesUrl + "init")
        //    .then(function (data) {
        //        notification.alert(data)
        //    });
        //loadUserInfo();
    }); 
    
    function loadUserInfo() {               
        var phoneId = device.uuid;
        window.phoneId = CryptoJS.SHA1(phoneId).toString();
    }
}());