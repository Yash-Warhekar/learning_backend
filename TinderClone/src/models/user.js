const mongoose=require('mongoose')

const {Schema}=mongoose


//creating user schema
const userSchema=new Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String
    },
    password:{
        type:String
    },
    age:{
        type:Number
    },
    gender:{
        type:String
    }
})


// creating user model from userschema
const User=mongoose.model('User',userSchema)

module.exports={User}