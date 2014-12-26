plague-api
==========

Plague Social Platform NodeJS API

## Login(email, password, callback)
```javascript
plague.login('sample@domain.com', 'mypassword', function(user){
  if(user.error){
    console.log(user.error);
    return;
  }
  console.log(user);
})
/*
User Object:
{
  user: {
    id,
    avatar,
    is_email_verified,
    name,
    karma,
    can_infect,
    avatar_200,
    is_verified,
    bio,
    color,
    is_temporary
  },
  client: {
    id,
    uid,
    token,
    locale,
    useragent,
    ipaddress
  }
}
*/
```
