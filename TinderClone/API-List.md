#tinder clone API's 

##AuthRouter
-post /signup
-post /login
-post /logout

##profileRouter
-get /profile/view
-patch /profile/user
-patch /profile/password

##ConnectRequestRouter
-post /request/interested/:userid
-post /request/ignored/:userid
-post /request/review/accepted/:userid
-post /request/review/rejected/:userid


##userRouter
-get /user/connections
-get /user/requestes
-get /user/feed - give you the profiles of other users on platform