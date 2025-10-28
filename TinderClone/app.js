const express=require('express')
var cookieParser = require('cookie-parser')
const {connectDB}=require('./src/config/database')
const app=express()

const authRouter =require('./src/routes/auth')
const profileRouter =require('./src/routes/profile')
const requestsRouter =require('./src/routes/requests')

//middlewares
app.use(express.json());
app.use(cookieParser())



app.use('/',authRouter)
app.use('/',profileRouter)
app.use('/',requestsRouter)



//first connect to db then start app
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