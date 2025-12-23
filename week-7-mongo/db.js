const mongoose=require('mongoose')

const Schema=mongoose.Schema;

const userSchema=new Schema({
    name:{
        type:String,
        required:true,
        minlength:[3,'name must be at least 3 chars']
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:{ createdAt: 'created_on', updatedAt: 'modified_on' }})


const todoSchema=new Schema({
    title:{
        type:String,
        required:true,
        minlength:[3,'title must be 3 chars']
    },
    done:{
        type:Boolean,
        default:false,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    }
})


const UserModel=mongoose.model('user',userSchema)
const TodoModel=mongoose.model('todos',todoSchema)

module.exports={
    UserModel,
    TodoModel
}