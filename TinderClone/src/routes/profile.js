const express=require('express')
const {userAuth}=require('../middlewares/auth')

const profileRouter=express.Router()



// get profile of user by jwt
profileRouter.get('/profile',userAuth,async (req,res)=>{
    try{

    const user=req.user
    console.log(user)
    res.send(user)
}catch(err){
        res.status(400).send('Error '+err.message)
    }
    
})


module.exports=profileRouter;