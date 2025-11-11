// ##userRouter
const express=require('express');
const { userAuth } = require('../middlewares/auth');
const ConnectionRequestModel = require('../models/connectionRequest');

const userRouter=express.Router();

// -get /user/connections






// -get /user/requestes
//get all the pending connection request for the loggedIn user
userRouter.get('/user/requests/received',userAuth,async(req,res)=>{
    try{
        const loggedInUser=req.user

        const conectionRequest=await ConnectionRequestModel.find({
            toUserId:loggedInUser._id,
            status:'interested'
        }).populate('fromUserId','firstName lastName profile age about')
        // }).populate('fromUserId',['firstName','lastName'])

        if(conectionRequest.length<1){
            return res.status(404).json({message:'Currently No requests'})
        }
        res.json({
            message:'data send successfully',
            data:conectionRequest
        })

    }catch(err){
        req.status(400).send('Error: '+err.message)
    }
})




// -get /user/feed - give you the profiles of other users on platform





module.exports=userRouter;