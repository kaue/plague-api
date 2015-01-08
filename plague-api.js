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
  var options = {};
  var auth = {};
  /*
    Todo
    http://plague.io/api/auth/confirm_email/?recipient=EMAIL&code=CODE
    http://plague.io/api/auth/reset_password/?recipient=EMAIL&code=CODE
  */

  /*
    Set Plague Api Options
  */
  plague.set = function(setOptions){
    options = setOptions;
    return plague;
  }
  /*

  */
  plague.register = function(email, password, name, callback){
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
        if(response.client.uid)
          auth.uid = response.client.uid;
        if(response.client.token)
          auth.token = response.client.token;
        callback(response);
      }
    });
  };
  /*
    Login to get UserId and Token
  */
  plague.login = function(email, password, callback){
    var requestUrl = util.format("http://plague.io/api/auth/login/?email=%s&password=%s", email, password);
    request({
      url: requestUrl,
      headers: apiHeaders
    }, function(error, response, body) {
      if (!error) {
        var response = JSON.parse(body);
        if(response.client.uid)
          auth.uid = response.client.uid;
        if(response.client.token)
          auth.token = response.client.token;
        callback(response);
      }
    });
  };
  /*
    Return all user posts
  */
  plague.getPosts = function(callback){
    var requestUrl = util.format("http://plague.io/api/posts/?uid=%s&token=%s",auth.uid, auth.token);
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
  plague.getInfectionsNearby = function(callback){
    var requestUrl = util.format("http://plague.io/api/infections/?uid=%s&token=%s",auth.uid, auth.token);
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
  plague.postText = function(text, callback){
    var requestUrl = 'http://plague.io/api/posts/';
    request.post({
      url: requestUrl,
      headers: apiHeaders,
      form: {
        latitude: options.latitude,
        longitude: options.longitude,
        meta:'{"administrativeArea":"Quebec","country":"Canada","locality":"Montreal"}',
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
  plague.postLink = function(mediaLink, mediaLinkPreview, text, callback){
    var requestUrl = 'http://plague.io/api/posts/';
    request.post({
      url: requestUrl,
      headers: apiHeaders,
      form: {
        latitude: options.latitude,
        longitude: options.longitude,
        meta:'{"administrativeArea":"Quebec","country":"Canada","locality":"Montreal"}',
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
  plague.deletePost = function(postId, callback){
    var requestUrl = util.format('http://plague.io/api/posts/%s/?uid=%s&token=%s',postId, auth.uid, auth.token);
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
  plague.deleteAllPosts = function(callback){
    plague.getPosts(function(r){
      r.posts.forEach(function(p){
        plague.deletePost(p.id);
      });
      callback();
    });
  };

  //Node.js Export
  module.exports = plague;
}());
