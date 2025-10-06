const express=require('express')

const app=express()
const {connectDB}=require('./src/config/database')

const {User}=require('./src/models/user')

app.use(express.json());

app.post('/signup',async (req,res)=>{
    const newuser=new User(req.body)

    try{
        await newuser.save()
        console.log('user saved')
        res.send(`user saved successfully of ${req.body.firstName}`)
    }catch(err){
        res.status(400).send('err saving user to db'+err.message)
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


