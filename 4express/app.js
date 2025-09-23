const express=require('express')

app=express()

const expressSession=require('express-session')

const flash=require('connect-flash')

const cors=require('cors')

// app.use(cors())

// app.use(expressSession({
//     resave:false,
//     saveUninitialized:false,
//     secret:'anything you like'
// }))

app.use(flash())


// app.use(function(req,res,next){
//     console.log('hey hello')
//     next()
// })

app.get('/',(req,res)=>{
   res.send('this is HOme page')
})


//using dynamic route
app.get('/profile/:username',function(req,res){
    res.send(req.params.username + 's page')
})


//using dynamic route
app.get('/author/:username/:age',function(req,res){
    res.send(`this is ${req.params.username}'s page who is ${req.params.age}`)
})



// app.get('/error',(req,res)=>{
//     msg=req.flash('error')
//     res.send(msg)
// })

// app.get('/sharedData',cors(),(req,res)=>{
//     console.log('this is shared data accessed by anyone')
// })


app.use((req, res) => {
  res.status(404).send('Route not found');
});

app.listen(3000,()=>{
    console.log('listening on port 3000')
})