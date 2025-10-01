const express=require('express')

const app=express()

const {adminAuth,userAuth}=require('./middleware')

app.use('/admin',adminAuth)

const  excludedpath=['/login','/signup']

app.use('/user',(req,res,next)=>{
    if (excludedpath.includes(req.path)){
        console.log(req.path)
        return next()
    }
    else{
        userAuth(req,res,next);
    }
})


app.get('/user',(req,res)=>{
    res.send("user page")
})

app.get('/user/data',(req,res)=>{
    res.send('user data')
})

app.get('/user/history',(req,res)=>{
    res.send('user history')
})

app.post('/user/login',(req,res)=>{
    console.log('login page')
    res.send("user login page")
})

app.post('/user/signup',(req,res)=>{
    console.log('login page')
    res.send("user login page")
})





app.get('/admin/getData',(req,res)=>{
    res.send('all data')
})

app.get('/admin/deleteuser',(req,res)=>{
    res.send('delete user')
})

app.listen(5555,()=>{
    console.log("listening on port 5555.....")
})