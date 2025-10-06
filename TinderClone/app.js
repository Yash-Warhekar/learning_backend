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


