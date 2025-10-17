const mongoose=require('mongoose')
const validator=require('validator')
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
        trim:true,
        validate(value){
            if (!validator.isEmail(value)){
                throw new Error('invalid email '+ value)
            }
        },
    },
    password:{
        type:String,
        required: true,
        validate(val){
            if(!validator.isStrongPassword(val)){
                throw new Error('password is not strong '+val)
            }
        }
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
    profile:{
        type:String,
         validate(value){
            if (!validator.isURL(value)){
                throw new Error('invalid url '+ value)
            }
        },
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