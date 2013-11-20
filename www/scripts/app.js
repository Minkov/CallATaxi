
var app = app || {};

(function() {
    document.addEventListener("deviceready", function() {
        app.servicesUrl = "http://taxiornot.apphb.com/api/";
        //app.servicesUrl = "http://localhost:60415/api/";
        new kendo.mobile.Application();   
        
        console.log("before user load");
        loadUserInfo();
    }); 
    
    function loadUserInfo() {               
        var phoneId = device.uuid;
        window.phoneId = CryptoJS.SHA1(phoneId).toString();
    }
}());