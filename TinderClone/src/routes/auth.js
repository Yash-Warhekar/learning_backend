const express=require('express')
const {signupValidator}=require('../utils/validator')
const bcrypt = require('bcrypt');
const {User}=require('../models/user')
const validator=require('validator')
const authRouter=express.Router();

//singup api for new user
authRouter.post('/signup',async (req,res)=>{
try{
   
    // validate the req.body
    signupValidator(req);

    //encrypt the password
    const {password}=req.body;


    const hashedPass=await bcrypt.hash(password, 10);
    

    //make instance of user for saving in DB
    const newuser=new User({
        firstName:req.body.firstName,
        lastName:req.body.lastName
        ,emailId:req.body.emailId,password:hashedPass
    })

    // console.log(newuser)
    await newuser.save()
    console.log('user saved')

    //now we will automatically log in the user
    console.log(newuser._id)
    // 1.create jwt token
    const token=await newuser.getjwt()
    //2.add token to cookie and sent it to user
    res.cookie("token",token,{expires:new Date(Date.now() + 8*3600000)})
    //3.done now, send success
    res.status(201).json({
        message:`Signup successful. Logged in as ${newuser.firstName}`,
        newuser
    })

    }catch(err){
        res.status(400).send('err saving user to db '+err.message)
    }
    
})



//login api for user login
authRouter.post('/login',async(req,res)=>{
    try{
        //read the body
        const {emailId,password}=req.body
        //validate the email
        if(!validator.isEmail(emailId)){
                throw new Error('invalid Email')
            }
        //check if email is present in db
        const user=await User.findOne({emailId:emailId})
        if (!user){
            throw new Error('Invalid Credentials')
        }
        //check if entered password is correct
        const ifUserExists=await user.validatePassword(password)
        //if yes return login success
        if (ifUserExists){
            //create jwt token
            const token=await user.getjwt()
            // console.log(token)

            //add token to cookie and sent it to user
            res.cookie("token",token,{expires:new Date(Date.now() + 8*3600000)})
            res.send(user)
        }else{
        //else throw new error :password incorrect
            throw new Error('Invalid Credentials')        
    }
    }catch(err){
        res.status(400).send('Error '+err.message)
    }
})


//logout api for user login
authRouter.post('/logout',(req,res)=>{
     res.cookie("token",null,{expires:new Date(Date.now())})
     res.send('logged out')
})
module.exports=authRouter;