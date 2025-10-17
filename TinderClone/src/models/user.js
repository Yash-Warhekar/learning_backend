const mongoose=require('mongoose')

const {Schema}=mongoose


//creating user schema
const userSchema=new Schema({
    firstName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:50
    },
    lastName:{
        type:String,
        default:'your_lastname'
    },
    emailId:{
        type:String,
        unique:true,
        required:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required: true
    },
    age:{
        type:Number,
        min:18,
        max:100
    },
    gender:{
        type:String,
        lowercase:true,
        validate(value){
            if(!['male','female','others'].includes(value)){
                throw new Error('enter valid gender')
                
            }
        }
    },
    skills:{
        type:[String],
        validate: {
        validator: function (arr) {
            return arr.length<=10
            },
        message:"only 10 skills are allowed."
        },
        default: []
    }
},{timestamps:true})


// creating user model from userschema
const User=mongoose.model('User',userSchema)

module.exports={User}