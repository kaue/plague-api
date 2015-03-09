# plague-api 
[![npm package](https://nodei.co/npm/plague-api.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/plague-api/)
 
[![Build Status](http://img.shields.io/travis/kauegimenes/plague-api.svg)](https://travis-ci.org/kauegimenes/plague-api)   [![Gitter](https://img.shields.io/badge/gitter-join_chat-blue.svg?style=flat)](https://gitter.im/kauegimenes/plague-api?utm_source=badge)

Plague Social Platform NodeJS API Changelog
----------------------
v1.09 - include badges<br>
v1.08 - include tests<br>
v1.07 - new methods - resetPassword and confirmEmail<br>
v1.06 - option to change locality using set function<br>
v1.05 - fix encoding problem<br>
v1.04 - register method<br>

set(options)
----------------------
Set Plague Api Options
#### Parameters:
**options:** Use this to set your location.
#### Sample Code:
```javascript
var plague = require('plague-api').set({
  latitude: -99.999999999999,
  longitude: -99.999999999999,
  administrativeArea: 'Quebec',
  country: 'Canada',
  locality: 'Montreal'
});
```

register(email, password, name, callback)
--------------------
Register to get UserId and Token
#### Parameters:
**email:** Your user email.<br>
**password:** Your user password.<br>
**name:** Your name.<br>
**callback:** callback function.
#### Sample Code:
```javascript
plague.register('sample@domain.com', 'mypassword', 'My Name', function(user){
  if(user.error){
    console.log(user.error);
    return;
  }
  console.log(user);
});
```

login(email, password, callback)
--------------------
Login to get UserId and Token
#### Parameters:
**email:** Your plague user email.<br>
**password:** Your plague user password.<br>
**callback:** callback function.
#### Sample Code:
```javascript
plague.login('sample@domain.com', 'mypassword', function(user){
  if(user.error){
    console.log(user.error);
    return;
  }
  console.log(user);
});
```

confirmEmail(email, code, callback)
--------------------
Confirm user e-mail
#### Parameters:
**email:** Your plague user email.<br>
**code:** Your plague confirmation code.<br>
**callback:** callback function.
#### Sample Code:
```javascript
plague.confirmEmail('sample@domain.com', '1234', function(res){
  console.log(res);
});
```

resetPassword(email, code, callback)
--------------------
Reset user password using e-mail
#### Parameters:
**email:** Your plague user email.<br>
**code:** Your plague confirmation code.<br>
**callback:** callback function.
#### Sample Code:
```javascript
plague.resetPassword('sample@domain.com', '1234', function(res){
  console.log(res);
});
```

getPosts(callback)
----------------------
Return all user posts
#### Parameters:
**callback:** callback function.
#### Sample Code:
```javascript
plague.login('sample@domain.com', 'mypassword', function(user){
  if(user.error){
    console.log(user.error);
    return;
  }
  //List all user posts
  plague.getPosts(function(res){
    var posts = res.posts;
    posts.forEach(function(post) {
      console.log(post);
    })
  });
});
```

getInfectionsNearby(callback)
----------------------
Return Nearby Plagues
#### Parameters:
**callback:** callback function.
#### Sample Code:
```javascript
plague.login('sample@domain.com', 'mypassword', function(user){
  if(user.error){
    console.log(user.error);
    return;
  }
  plague.getInfectionsNearby(function(res){
    console.log(res);
  });
});
```

postText(text, callback)
----------------------
Send a text only post to Plague API
#### Parameters:
**text:** Text of the post.<br>
**callback:** callback function.
#### Sample Code:
```javascript
plague.login('sample@domain.com', 'mypassword', function(user){
  if(user.error){
    console.log(user.error);
    return;
  }
  plague.postText('Hello Plague', function(res){
    console.log(res);
  });
});
```

postLink(mediaLink, mediaLinkPreview, text, callback)
----------------------
Send a post with a Media Link
#### Parameters:
**mediaLink:** Url of the image should be around **600x600** pixels.<br>
**mediaLinkPreview:** Url of the image should be around **300x300** pixels.<br>
**callback:** callback function.
#### Sample Code:
```javascript
plague.login('sample@domain.com', 'mypassword', function(user){
  if(user.error){
    console.log(user.error);
    return;
  }
  plague.postLink(
    'http://domain.com/imageFull.png',
    'http://domain.com/imageSmall.png',
    'Hello! =)',function(res){
      console.log(res);
    });
});
```

deletePost(postId, callback)
----------------------
Delete a post using postId
#### Parameters:
**postId:** This is the id returned from **getPosts**.<br>
**callback:** callback function.
#### Sample Code:
```javascript
plague.login('sample@domain.com', 'mypassword', function(user){
  if(user.error){
    console.log(user.error);
    return;
  }
  plague.deletePost(123456,function(res){
    console.log(res);
  });
});
```

deleteAllPosts(postId, callback)
----------------------
Delete all user posts
#### Parameters:
**callback:** callback function.
#### Sample Code:
```javascript
plague.login('sample@domain.com', 'mypassword', function(user){
  if(user.error){
    console.log(user.error);
    return;
  }
  plague.deleteAllPosts(function(res){
    console.log(res);
  });
});
```
