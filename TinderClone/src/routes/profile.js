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
        //check if input fields are valid
        if(!validateProfileUpdate(req)){
        throw new Error('invalid edit request')}

        // logged in user from middleware
        const loggeduser=req.user
       
        //update fields
        Object.keys(req.body).forEach((key)=>{
            loggeduser[key]=req.body[key]
        })
        
        // save to db
        await loggeduser.save()
        res.json({message:"profile updated successfully",updatedData:loggeduser})

}catch(err){
    res.status(400).send('Error: '+err.message)
}
})


//create api for forgot password patch  /profile/password

module.exports=profileRouter;