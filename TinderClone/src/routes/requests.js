const express=require('express');
const { userAuth } = require('../middlewares/auth');

const requestsRouter=express.Router()

requestsRouter.post('/sendConnectionrequest',userAuth,async(req,res)=>{
    const user=req.user

    //sending request
    console.log('sending connection request')
    res.send(user.firstName+ " sent the connect request")
})


module.exports=requestsRouter;