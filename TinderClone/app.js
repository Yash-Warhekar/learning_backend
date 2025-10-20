const express=require('express')
const {signupValidator}=require('./src/utils/validator')
const bcrypt = require('bcrypt');
const app=express()
const {connectDB}=require('./src/config/database')

const {User}=require('./src/models/user')


app.use(express.json());

app.post('/signup',async (req,res)=>{
try{
    // validate the req.body
    signupValidator(req);

    //encrypt the password
    const {password}=req.body.password;

    const hashedPass=await bcrypt.hash(password, 10);
    console.log(hashedPass)

    //make instance of user for saving in DB
    const newuser=new User({firstName:req.body.firstName,lastName:req.body.lastName,emailId:req.body.emailId,password:hashedPass})

        await newuser.save()
        console.log('user saved')
        res.send(`user saved successfully of ${req.body.firstName}`)
    }catch(err){
        res.status(400).send('err saving user to db '+err.message)
    }
    
})



//get user by email on /user
app.get('/user',async(req,res)=>{
  
    const useremail=req.body.emailId
    console.log(useremail)

    try{
        const user = await User.findOne({ emailId: useremail });
        if (!user){
            res.send('no user found with this email')
        }
        res.send(user)
        
        
    }catch(err){
        res.status(400).send('error finding user')
    }
})



//get all users on /feed
app.get('/feed',async(req,res)=>{

    try{
        const user=await User.find({})
        if (user.length <=0 ){
            res.send('currently no user made')
        }
        res.send(user)
    }catch(err){
        res.status(400).send('error finding user')
    }
})

//delete user by id
app.delete('/user/:userId',async (req,res)=>{
    const userid=req.params?.userId
 
    try{
        const user=await User.findByIdAndDelete(userid)
        res.send('user deleted successfully')
    }catch(err){
        res.status(400).send('err deleting user'+err.message)
    }
})



app.patch('/user/:userId',async (req,res)=>{
    const userbody=req.body
    const userid=req.params?.userId
    console.log(userid)


    
    // if (userbody)

    try{
        const ALLOWED_UPDATES=["firstName","lastName","password","age", "gender","skills"]

    const isAllowed = Object.keys(userbody).every((k) => {
     return ALLOWED_UPDATES.includes(k);
    });

    if (!isAllowed){
        throw new Error(' : Update denied')
        
    }
        const user=await User.findByIdAndUpdate({_id:userid},userbody,{runValidators:true,new:true})

        if(!user) return res.status(404).send('user not found')

        res.send('user updated successfully')
    }catch(err){
        res.status(400).send('err updating user'+err.message)
    }
})











connectDB()
.then(()=>{
    console.log('connection successfully established with database..')
    app.listen(5555,()=>{
    console.log("listening on port 5555.....")
    })
})
.catch((err)=>{
    console.log('some error happend connectingdb')
})




//Never trust req.body always validate first