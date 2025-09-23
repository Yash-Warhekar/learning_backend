const express=require('express')


const app=express()

app.set('view engine','ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/',function(req,res){
    console.log(req.method)
})

app.post('/check',function(req,res){
    console.log(req.method)
})

app.put('/check',function(req,res){
    console.log(req.method)
})

app.delete('/check',function(req,res){
    console.log(req.method)
})
app.listen(3000)