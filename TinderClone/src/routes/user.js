// ##userRouter
const express=require('express');
const { userAuth } = require('../middlewares/auth');
const ConnectionRequestModel = require('../models/connectionRequest');

const userRouter=express.Router();

const userSavedData='firstName lastName profile age about'


// -get /user/connections
//returns all user connections
userRouter.get('/user/connections',userAuth,async(req,res)=>{
    try{
        const loggedInUser=req.user

        const conectionRequest=await ConnectionRequestModel.find({
            $or:[
                {toUserId:loggedInUser._id,status:'accepted'},
                {fromUserId:loggedInUser._id,status:'accepted'}
            ]
        }).populate('fromUserId',userSavedData)
        
        if(conectionRequest.length<1){
            return res.status(404).json({message:'Currently No requests'})
        }
        const data=conectionRequest.map((userdata)=>userdata.fromUserId)
        res.json({data})

    }catch(err){
        res.status(400).send('Error :'+err.message)
    }
})





// -get /user/requestes
//get all the pending connection request for the loggedIn user
userRouter.get('/user/requests/received',userAuth,async(req,res)=>{
    try{
        const loggedInUser=req.user

        const conectionRequest=await ConnectionRequestModel.find({
            toUserId:loggedInUser._id,
            status:'interested'
        }).populate('fromUserId',userSavedData)
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