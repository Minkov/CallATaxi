var app = app || {};

(function(a) {
    var viewModel = kendo.observable({
        username:"",
        newUsername:"",
        successMessage:"",
        errMessage:"",
        changeUsername: function() {
            var self = viewModel;
            var newUser = self.get("newUsername");
            if (!newUser || newUser.length < 4) {
                self.set("errMessage", "Invalid username length");
                setTimeout(function() {
                    selt.set("errMessage", "");                        
                }, 3000);
                return;
            }
            httpRequest.putJSON(app.servicesUrl + "users", {"Username":newUser}, {"x-phoneId":window.phoneId})
            .then(function(changeSuccess) {
                self.set("username", changeSuccess.Username);
                selt.set("successMessage", "Username successfully changed!");
                setTimeout(function() {
                    selt.set("successMessage", "");                        
                }, 3000);
            }, function(changeError) {
                selt.set("errMessage", changeError.Message);
                setTimeout(function() {
                    selt.set("errMessage", "");                        
                }, 3000);
            });
        }
    });
    
    function init(e) {
        kendo.bind(e.view.element, viewModel);
        httpRequest.getJSON(app.servicesUrl + "users", {"x-phoneId":window.phoneId})
        .then(function(userInfo) {
            viewModel.set("username", userInfo.Username);     
        })
    }
    
    function dispose(e) {
        viewModel.set("newUsername", "");
    }
    
    a.users = {        
        init:init,
        dispose: dispose
    };
}(app));