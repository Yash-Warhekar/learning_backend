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