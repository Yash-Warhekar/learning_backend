#tinder clone API's 

##AuthRouter
-post /signup
-post /login
-post /logout

##profileRouter
-get /profile/view
-patch /profile/user
-patch /profile/password    update_password

##ConnectRequestRouter
-request/send/status/:userId==>
{-post /request/send/interested/:userid
-post /request/send/ignored/:userid}

-request/review/:status/:requestId==>
{-post /request/review/accepted/:userid
-post /request/review/rejected/:userid}

status:ignore,interested,accepted,rejected

##userRouter
-get /user/connections
-get /user/requestes
-get /user/feed - give you the profiles of other users on platform


/feed?page=1&limit=10 =>0-10 .skip(0) .limit(10)

/feed?page=2&limit=10 =>11-20 .skip(10) .limit(10)

/feed?page=3&limit=10 =>21-30 .skip(20) .limit(10)

making formula for limit=(page-1)*limit
