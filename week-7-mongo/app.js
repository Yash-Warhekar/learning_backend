const express=require('express')
const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const {UserModel,TodoModel}=require('./db')
const  cookieParser =require('cookie-parser')
const JWT_SECRET='andupandugendu123456'
const env=require('dotenv')

env.config();

const app=express()
app.use(express.json())
app.use(cookieParser());


app.post('/signup',async (req,res)=>{
    try{

        const {name,email,password}=req.body

        const doesExists= await UserModel.find({email})
        
        if (doesExists){
            res.status(400).json({
                message:'user already exists'
            })
        }


        const passhash=await bcrypt.hash(password,10)

        const user=await UserModel.create({
            name,email,password:passhash
        })

        res.status(201).json({
            message:"user created successfully",user
        })

    }catch(err){
        console.log(err)
    }

})

app.post('/login',async (req,res)=>{
    try{

        const {email,password}=req.body
        
        const user=await UserModel.findOne({email})

        if(!user){
            return res.status(401).json({message:"unauthorizd"})
        }
        console.log(user)

        const comparepass=await bcrypt.compare(password,user.password)
        console.log(comparepass)
        if(comparepass===false){
            return res.status(401).json({message:'unauthorized'})
        }
        const token=jwt.sign({_id:user._id},JWT_SECRET)
        res.cookie('token',token)
        res.status(201).json({
            token,user
        })

    }catch(err){
        console.log(err)
    }
})

// POST /todo (authenticated)
app.post('/todo',auth,async(req,res)=>{
    try{

    const user=req.user
    console.log(user)
    const {title}=req.body

    const todo=await TodoModel.create({
        title,userId:user._id
    })


    res.status(201).json({
        message:'todo created successfully',
        foruser:user.name
    })
    }catch(err){
        console.log(err)
    }
})


app.get('/todos',auth,async (req,res)=>{
    try{

        const todos=await TodoModel.find({
            userId:req.user._id
        })

        if(!todos){
            return res.status(401).json({
                message:'no todos'
            })
        }

        res.status(200).json({
            todos
        })


    }catch(err){
        console.log(err)
    }
})

//mark todo as done
app.post('/todos-mark',auth,async (req,res)=>{
    try{

        const todoId=req.body.todoId;
        console.log(todoId)
        const todo=await TodoModel.find({
            userId:req.user._id,
            done:false,
            _id:todoId
        })
        console.log(todo)
        if(!todo){
            return res.status(401).json({
                message:'no todo like this'
            })
        }

        await TodoModel.updateOne({_id:todoId},
            {$set:{done:true}}
        ).then(()=>{
            res.status(200).json({
            todo
        })
        })

    }catch(err){
        console.log(err)
    }
})

async function auth(req,res,next){
   try{
     const token=req.headers.token || req.cookies.token

    if(!token){
        res.status(401).json({message:'login again'})
    }

    const decodedid=jwt.verify(token,JWT_SECRET)

    console.log(decodedid)
    const user=await UserModel.findOne({_id:decodedid._id})

    req.user=user
    next()
   }catch(err){
    console.log(err)
   }
}



async function main(){
    await mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log('connected to db'))
    .then(()=>{
        app.listen(3000,()=>console.log('listening on port 3000'))
    })
}

main()