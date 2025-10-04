const mongoose =require('mongoose')

//we are connecting cluster here
const connectDB=async()=>{
    await mongoose.connect("mongodb+srv://yash2000warhekar:Yash%402003@cluster0.fglfdqb.mongodb.net/TinderClone")
}


module.exports={connectDB}