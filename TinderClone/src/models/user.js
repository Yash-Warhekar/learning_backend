const mongoose=require('mongoose')
const validator=require('validator')
const jwt=require('jsonwebtoken')
const bcrypt = require('bcrypt');
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
        enum:{
            values:['male','female','others'],
            message:`{VALUE} is not valid gender type`
        },
        // validate(value){
        //     if(!['male','female','others'].includes(value)){
        //         throw new Error('enter valid gender')
                
        //     }
        // }
    },
    profile:{
        type:String,
        default:'https://static.vecteezy.com/system/resources/previews/013/042/571/original/default-avatar-profile-icon-social-media-user-photo-in-flat-style-vector.jpg',
         validate(value){
            if (!validator.isURL(value)){
                throw new Error('invalid url '+ value)
            }
        },
    },
    about:{
        type:String,
        default:'this is default about user'
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


//index
userSchema.index({firstName:1, lastName:1})


//some helper user method
//1.for genrating jwt token
userSchema.methods.getjwt=async function(){
    const user=this;

    const token=await jwt.sign({_id:user._id},"andupandugandu!@#$123",{expiresIn:'1d'});

    return token
}

//2.for password validation
userSchema.methods.validatePassword=async function (userInputPassword) {
    const user=this
    const passwordHash=user.password
    const ispasswordValid=await bcrypt.compare(userInputPassword,passwordHash)

    return ispasswordValid;
    
}


// creating user model from userschema
const User=mongoose.model('User',userSchema)

module.exports={User}