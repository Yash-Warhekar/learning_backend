const jwt=require('jsonwebtoken')
const {User}=require('../models/user')

const userAuth = async function (req,res,next){
   // get cookies for token
   const {token}=req.cookies
   if(!token){
    throw new Error('Invalid token!!!!!!!')
   }

   // validate this token
   const decodedData=await jwt.verify(token,"andupandugandu!@#$123")  //gives object
   const {_id} =decodedData //extract our _id/data

   //find user in db by _id
   const user=await User.findById({_id:_id})

   if(!user){
    throw new Error('Please Login again!!')
   }
   req.user=user;
   next();
}

module.exports={userAuth}