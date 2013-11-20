var httpRequest = (function() {
    function getJSON(url, headers) {
        var promise = new RSVP.Promise(function(resolve, reject) {
            $.ajax({
                url:url,
                type:"GET",
                contentType:"application/json",
                dataType:"json",
                headers:headers,
                timeout:5000,
                success:resolve,
                error:reject
            });
        });
        return promise;
    }
    
    function postJSON(url, data, headers) {
        var promise = new RSVP.Promise(function(resolve, reject) {
            $.ajax({
                url:url,
                type:"GET",
                contentType:"application/json",
                dataType:"json",
                data:JSON.stringify(data),
                headers:headers,
                timeout:5000,
                success:resolve,
                error:reject
            });
        });
        return promise;
    }
    
    function putJSON(url, data, headers) {
        var promise = new RSVP.Promise(function(resolve, reject) {
            $.ajax({
                url:url,
                type:"PUT",
                data:JSON.stringify(data),
                contentType:"application/json",
                headers:headers,
                dataType:"json",
                timeout:5000,
                success:resolve,
                error:reject
            });
        });
        return promise;
    }
    
    return {
        getJSON: getJSON,
        postJSON:postJSON,
        putJSON: putJSON
    }
}());