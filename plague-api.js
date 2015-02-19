(function() {
    var plague = {};
    var request = require('request'),
        util = require('util');



    var apiHeaders = {
        'Host': 'plague.io',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Connection': 'keep-alive',
        'Proxy-Connection': 'keep-alive',
        'Accept': 'application/json',
        'User-Agent': 'Plague/1.1.25 (iPhone; iOS 8.3; Scale/2.00)',
        'Accept-Language': 'en'
    };
    var options = {};
    var auth = {};

    /*
      Set Plague Api Options
    */
    plague.set = function(setOptions) {
            options = setOptions;
            return plague;
    }
    /*
      Confirm E-mail
    */
    plague.confirmEmail = function(email, code, callback) {
        var requestUrl = util.format("http://plague.io/api/auth/confirm_email/?recipient=%s&code=%s", email, code);
        request({
            url: requestUrl,
            headers: apiHeaders
        }, function(error, response, body) {
            if (!error) {
            	if(body == 'Bad code')
            		return callback({error: 'Bad code'})            	         	
                var response = JSON.parse(body);
                callback(response);
            }
        });
    };
    /*
      Reset user password using email
    */
    plague.resetPassword = function(email, code, callback) {
        var requestUrl = util.format("http://plague.io/api/auth/reset_password/?recipient=%s&code=%s", email, code);
        request({
            url: requestUrl,
            headers: apiHeaders
        }, function(error, response, body) {
            if (!error) {
            	if(body == 'Bad code, try to request code again')
            		return callback({error: 'Bad code, try to request code again'})
                var response = JSON.parse(body);                
                callback(response);
            }
        });
    };    
    /*
		Create a new Plague user
    */
    plague.register = function(email, password, name, callback) {
        var requestUrl = 'http://plague.io/api/users/';
        request.post({
            url: requestUrl,
            headers: apiHeaders,
            form: {
                latitude: options.latitude,
                longitude: options.longitude,
                email: email,
                password: password,
                name: name
            }
        }, function(error, response, body) {
            if (!error) {
                var response = JSON.parse(body);
                if (response.client.uid)
                    auth.uid = response.client.uid;
                if (response.client.token)
                    auth.token = response.client.token;
                callback(response);
            }
        });
    };
    /*
      Login to get UserId and Token
    */
    plague.login = function(email, password, callback) {
        var requestUrl = util.format("http://plague.io/api/auth/login/?email=%s&password=%s", email, password);
        request({
            url: requestUrl,
            headers: apiHeaders
        }, function(error, response, body) {
            if (!error) {
                var response = JSON.parse(body);
                if (response.client.uid)
                    auth.uid = response.client.uid;
                if (response.client.token)
                    auth.token = response.client.token;
                callback(response);
            }
        });
    };
    /*
      Return all user posts
    */
    plague.getPosts = function(callback) {
        var requestUrl = util.format("http://plague.io/api/posts/?uid=%s&token=%s", auth.uid, auth.token);
        request({
            url: requestUrl,
            headers: apiHeaders
        }, function(error, response, body) {
            if (!error) {
                var response = JSON.parse(body);
                callback(response);
            }
        });
    };
    /*
      Return Nearby Plagues
    */
    plague.getInfectionsNearby = function(callback) {
        var requestUrl = util.format("http://plague.io/api/infections/?uid=%s&token=%s", auth.uid, auth.token);
        request({
            url: requestUrl,
            headers: apiHeaders
        }, function(error, response, body) {
            if (!error) {
                var response = JSON.parse(body);
                callback(response);
            }
        });
    };
    /*
      Send a Text Post to Plague
    */
    plague.postText = function(text, callback) {
        var requestUrl = 'http://plague.io/api/posts/';
        request.post({
            url: requestUrl,
            headers: apiHeaders,
            form: {
                latitude: options.latitude,
                longitude: options.longitude,
                meta: {
                    administrativeArea: !options.administrativeArea ? "Quebec" : options.administrativeArea,
                    country: !options.country ? "Canada" : options.country,
                    locality: !options.locality ? "Montreal" : options.locality
                },
                text: text,
                token: auth.token,
                uid: auth.uid
            }
        }, function(error, response, body) {
            if (!error) {
                var response = JSON.parse(body);
                callback(response);
            }
        });
    };
    /*
      Send a Post with a Media Link
    */
    plague.postLink = function(mediaLink, mediaLinkPreview, text, callback) {
        var requestUrl = 'http://plague.io/api/posts/';
        request.post({
            url: requestUrl,
            headers: apiHeaders,
            form: {
                latitude: options.latitude,
                longitude: options.longitude,
                meta: {
                    administrativeArea: !options.administrativeArea ? "Quebec" : options.administrativeArea,
                    country: !options.country ? "Canada" : options.country,
                    locality: !options.locality ? "Montreal" : options.locality
                },
                media: mediaLink,
                media_preview: mediaLinkPreview,
                text: text,
                token: auth.token,
                uid: auth.uid
            }
        }, function(error, response, body) {
            if (!error) {
                var response = JSON.parse(body);
                callback(response);
            }
        });
    };
    /*
      Delete a post using postId
    */
    plague.deletePost = function(postId, callback) {
        var requestUrl = util.format('http://plague.io/api/posts/%s/?uid=%s&token=%s', postId, auth.uid, auth.token);
        request.del({
            url: requestUrl,
            headers: apiHeaders
        }, function(error, response, body) {
            if (!error) {
                var response = JSON.parse(body);
                callback(response);
            }
        });
    };
    /*
      Delete all user posts
    */
    plague.deleteAllPosts = function(callback) {
        plague.getPosts(function(r) {
            r.posts.forEach(function(p) {
                plague.deletePost(p.id);
            });
            callback();
        });
    };

    //Node.js Export
    module.exports = plague;
}());