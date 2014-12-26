(function () {
  var plague = {};
  var request = require('request'),
      util    = require('util');



  var apiHeaders = {
    'Host':'plague.io',
    'Content-Type':'application/x-www-form-urlencoded; charset=utf-8',
    'Connection':'keep-alive',
    'Proxy-Connection':'keep-alive',
    'Accept':'application/json',
    'User-Agent':'Plague/1.1.25 (iPhone; iOS 8.3; Scale/2.00)',
    'Accept-Language':'en',
    'Accept-Encoding':'gzip, deflate'
  };

  /*
    Todo
    http://plague.io/api/auth/confirm_email/?recipient=EMAIL&code=CODE
    http://plague.io/api/auth/reset_password/?recipient=EMAIL&code=CODE
  */
  //
  // Login to get UserId and Token
  //
  plague.login = function(email, password, callback){
    var requestUrl = util.format("http://plague.io/api/auth/login/?email=%s&password=%s", email, password);
    request({
      url: requestUrl,
      headers: apiHeaders
    }, function(error, response, body) {
      if (!error) {
        var response = JSON.parse(body);
        callback(response) // Show the HTML for the Google homepage.
      }
    });
  };
  //
  // Return all user posts
  //
  plague.getPosts = function(uid, token, callback){
    var requestUrl = util.format("http://plague.io/api/posts/?uid=%s&token=%s",uid, token);
    request({
      url: requestUrl,
      headers: apiHeaders
    }, function(error, response, body) {
      if (!error) {
        var response = JSON.parse(body);
        callback(response) // Show the HTML for the Google homepage.
      }
    });
  };
  //
  // Return Nearby Plagues
  //
  plague.getInfectionsNearby = function(uid, token, callback){
    var requestUrl = util.format("http://plague.io/api/infections/?uid=%s&token=%s",uid, token);
    request({
      url: requestUrl,
      headers: apiHeaders
    }, function(error, response, body) {
      if (!error) {
        var response = JSON.parse(body);
        callback(response) // Show the HTML for the Google homepage.
      }
    });
  };


  // Node.js
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = plague;
  }
  // AMD / RequireJS
  else if (typeof define !== 'undefined' && define.amd) {
    define([], function () {
      return plague;
    });
  }
  // included directly via <script> tag
  else {
    root.async = plague;
  }

}());
