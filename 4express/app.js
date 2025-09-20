const express=require('express')

app=express()

app.use(function(req,res,next){
    console.log('hey hello')
    next()
})

app.get('/',(req,res)=>{
    res.send('Home Page')
})

app.use((req, res) => {
  res.status(404).send('Route not found');
});

app.listen(3000,()=>{
    console.log('listening on port 3000')
})