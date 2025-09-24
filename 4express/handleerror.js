const express=require('express')

const app=express()

app.get('/',function(req,res,next){
    try{
        res.send('hey')
    }catch{
        next(err)
        
    }
})

app.get('/check',(req,res)=>{
    res.send('check')
})

//default error handler
app.use((err,req,res,next)=>{
    res.status(500).send(err.message);
})

app.listen(3000)