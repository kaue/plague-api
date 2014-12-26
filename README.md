plague-api
==========
Plague Social Platform NodeJS API

set(options)
----------------------
Set Plague Api Options
#### Sample Code:
```javascript
var plague = require('plague-api').set({
  latitude: -99.999999999999,
  longitude: -99.999999999999
});
```

login(email, password, callback)
--------------------
Login to get UserId and Token
#### Sample Code:
```javascript
plague.login('sample@domain.com', 'mypassword', function(user){
  if(user.error){
    console.log(user.error);
    return;
  }
  //Now you have user.uid and user.token
  console.log(user);
});
```

getPosts(callback)
----------------------
Return all user posts
#### Sample Code:
```javascript
plague.login('sample@domain.com', 'mypassword', function(user){
  if(user.error){
    console.log(user.error);
    return;
  }
  //Now you have user.uid and user.token
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
#### Sample Code:
```javascript
plague.login('sample@domain.com', 'mypassword', function(user){
  if(user.error){
    console.log(user.error);
    return;
  }
  //Now you have user.uid and user.token
  plague.getInfectionsNearby(function(res){
    console.log(res);
  });
});
```

postText(text, callback)
----------------------
Send a text only post to Plague API
#### Sample Code:
```javascript
plague.login('sample@domain.com', 'mypassword', function(user){
  if(user.error){
    console.log(user.error);
    return;
  }
  //Now you have user.uid and user.token
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
**mediaLinkPreview:** Url of the image should be around **300x300** pixels.
#### Sample Code:
```javascript
plague.login('sample@domain.com', 'mypassword', function(user){
  if(user.error){
    console.log(user.error);
    return;
  }
  //Now you have user.uid and user.token
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
  //Now you have user.uid and user.token
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
  //Now you have user.uid and user.token
  plague.deleteAllPosts(function(res){
    console.log(res);
  });
});
```
