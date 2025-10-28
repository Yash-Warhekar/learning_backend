const express=require('express')
const {userAuth}=require('../middlewares/auth')
const {validateProfileUpdate}=require('../utils/validator')
const profileRouter=express.Router()



// get profile of user 
profileRouter.get('/profile/view',userAuth,async (req,res)=>{
    try{

    const user=req.user
    console.log(user)
    res.send(user)
}catch(err){
        res.status(400).send('Error '+err.message)
    }
    
})


//update profile of user
profileRouter.patch('/profile/edit',userAuth,async(req,res)=>{
    try{
        if(!validateProfileUpdate(req)){
        throw new Error('invalid edit request')}

        const loggeduser=req.user
        console.log(loggeduser)
        Object.keys(req.body).forEach((key)=>{
            loggeduser[key]=req.body[key]
        })
        console.log(loggeduser)
        await loggeduser.save()
        res.send(`${loggeduser.firstName} , your profile updated successfully`)


}catch(err){
    res.status(400).send('Error: '+err.message)
}
})

module.exports=profileRouter;