const express=require('express')
const { fstat } = require('fs')
const app=express()
const path=require('path')
const fs=require('fs')


app.set('view engine','ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))


app.get('/',(req,res)=>{
    fs.readdir('./todos',function(err,files){
        if (err) return res.status(500).send(err)
        res.render('index',{files:files})
    })
})

app.get('/create',(req,res)=>{
    res.render('create')
})

app.post('/createtodo',(req,res)=>{
    fs.writeFile(`./todos/${req.body.title}`,req.body.content,(err)=>{
        if (err) return res.send(err)
        console.log("created/updated file(b/c=using same route for both)")
        res.redirect('/')
    })
})

app.get('/edit/:filename',(req,res)=>{
    const filename=req.params.filename
    fs.readFile(`./todos/${filename}`,'utf-8',(err,data)=>{
        if (err) return res.status(500).send(err)
        console.log(`updating ${filename}`)    
        res.render('edit',{filename:filename,data})
    })
})


app.get('/show/:filename',(req,res)=>{
    const filename=req.params.filename
    fs.readFile(`./todos/${filename}`,'utf-8',(err,data)=>{
        if (err) return res.status(500).send(err)
        console.log(`updating ${filename}`)    
        res.render('hisab',{filename:filename,data})
    })
})



app.get('/delete/:filename',(req,res)=>{
    const filename=req.params.filename
    fs.unlink(`./todos/${filename}`,(err)=>{
        if (err) return res.status(500).send(err)
        res.redirect('/')    
    })
})

app.listen(3000,()=>{
    console.log('listening on port 3000')
})