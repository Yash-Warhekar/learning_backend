// ##userRouter
const express=require('express');
const { userAuth } = require('../middlewares/auth');
const ConnectionRequestModel = require('../models/connectionRequest');
const { User } = require('../models/user');

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
        .populate('toUserId',userSavedData)
        
        if(conectionRequest.length<1){
            return res.status(404).json({message:'Currently No requests'})
        }
        const data=conectionRequest.map((userdata)=>{
            if(userdata.fromUserId===loggedInUser._id){
                return userdata.toUserId
            }
            return userdata.fromUserId
        })
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
userRouter.get('/feed',userAuth,async(req,res)=>{
    try{
        const loggedInUser=req.user

    //get all the connections of either sent/received by user 
    const connectionRequest=await ConnectionRequestModel.fine({
        $or:[{fromUserId:loggedInUser._id},{toUserId:loggedInUser._id}]
    }).select('toUserId fromUserId');

    //remove already connected users from feed
    const hideUserFromFeed=new Set()

    connectionRequest.forEach((request) => {
        hideUserFromFeed.add(request.fromUserId.toString())
        hideUserFromFeed.add(request.toUserId.toString())
    });

    //find user in db except already connected ones
    const users=await User.find({
        $and:[
            {_id:{$nin:Array.from(hideUserFromFeed)}},
            {_id:{$ne:loggedInUser._id}}
        ]
    }).select(userSavedData)

    res.send(users)
    }catch(err){
        res.status(400).send('Error: '+ err.message)
    }
})




module.exports=userRouter;