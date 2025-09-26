const express=require('express')
const path=require('path')
const fs=require('fs')
const app=express()


// important boilerpalate
app.set('view engine','ejs')
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json())
app.use(express.urlencoded({extended:true}))


// my main route
app.get('/',function(req,res){
   fs.readdir(`./files`,function(err,files){
    res.render('index',{files})
   })
})



// route for creating file
app.get('/create',function(req,res){
    const currdate=new Date();
    const day=String(currdate.getDate()).padStart(2,'0')
    const month=String(currdate.getMonth()+1).padStart(2,'0')
    const year=currdate.getFullYear()

    const today=`${day}-${month}-${year}.txt`
    if (fs.existsSync(`./files/${today}`)){
        console.log('already exists')
        res.redirect('/')
    }else{
        fs.writeFile(`./files/${today}`,'default data',(err,data)=>{
        if(err)res.send('something went wrong')
        console.log('created')    
        res.redirect(`/edit/${today}`)
    })
    }
    
})


// route for viewing file
app.get('/edit/:filename',function(req,res){
    fs.readFile(`./files/${req.params.filename}`,'utf-8',(err,data)=>{
        if(err) return res.send(err)
        res.render('edit',{data,filename:req.params.filename})    
    })
})

//same route for updating file
app.post('/update/:filename',function(req,res){
    fs.writeFile(`./files/${req.params.filename}`,req.body.editedhisab,(err)=>{
        if(err) return res.send(err)
        res.redirect('/')
    })
})

//deleting file
app.get('/delete/:filename',function(req,res){
    fs.unlink(`./files/${req.params.filename}`,(err)=>{
        if(err) return res.send(err)
        res.redirect('/')
    })
})



app.listen(3000,()=>{
    console.log("listning on port 3000")
})