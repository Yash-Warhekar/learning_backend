const express=require('express');
const { userAuth } = require('../middlewares/auth');
const ConnectionRequestModel = require('../models/connectionRequest');
const  {User}=require('../models/user')

const requestsRouter=express.Router()


// -post /request/send/interested/:userid
// -post /request/send/ignored/:userid
requestsRouter.post(
    '/request/send/:status/:toUserId',
    userAuth,
    async(req,res)=>{
    try{
    
        const fromUserId=req.user._id;  //extracted from userauth middleware
        const toUserId=req.params.toUserId;
        const status=req.params.status;

        //if  both ids are  same    (can_be_used_but_used_schama_level_pre_function)
        // if (fromUserId.toString() === toUserId.toString()) {
        //     return res.status(400).json({
        //     message: 'You cannot send a connection request to yourself',
        // });
        // }
        const  allowedStatus=['ignore','interested']

        if(!allowedStatus.includes(status)){
            return res
            .status(400)
            .json({message:'invalid status type: '+status})
        }
        
        
        
        //check whether the touser exists or  not
        const touser=await User.findById(toUserId)

        if(!touser){
            return res.status(404).json({
                message:'user you are trying to send request does not exists'
            })
        }


        //check if  theres  existing  connectionrequest from  same  user present  in  db
        const existingrequest=await ConnectionRequestModel.findOne({
            $or:[
            {fromUserId,toUserId},
            {fromUserId:toUserId,toUserId:fromUserId},
            ],
        })

        if(existingrequest){
            return res.status(400).json({
                message:'request already sent!!'
            })
        }

        const  conectioRequest=new ConnectionRequestModel({
            fromUserId,
            toUserId,
            status,
        });

        const data=await conectioRequest.save()
        
        res.json({
            message:req.user.firstName+" " +status+"'s "+ touser.firstName,
            data
        })


    }catch(err){
        res.status(400).send('error '+err.message)
    }
})


module.exports=requestsRouter;