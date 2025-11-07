const mongoose=require('mongoose')
const {Schema,model}=mongoose
const connectionRequestSchema=new Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    status:{
        type:String,
        enum:{
            values:['ignore','interested','accepted','rejected'],
            message:`{VALUE} is incorrect status`
        }

    }
},{timestamps:true})

connectionRequestSchema.pre('save',function(next){
    const connectionRequest=this
    //check if  the fromuserid  is  same  as  touserif
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw  new Error('cannot send connection request to yourself!!!')
    }
    next();
})


const ConnectionRequestModel = new model('ConnectionRequest',connectionRequestSchema);

module.exports=ConnectionRequestModel