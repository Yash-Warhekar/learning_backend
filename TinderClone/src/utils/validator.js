const validator=require('validator')
const signupValidator=(req)=>{
    const {firstName, lastName,emailId,password }=req.body;
    // console.log(typeof(firstName))
    // console.log(req.body)
    if (!firstName || !lastName){
        throw new Error('Not a valid Name')
    }
    else if(firstName.length < 4 || firstName.length > 50){
        throw new Error('length of firstName is invalid')
    }
    else if(lastName.length < 4 || lastName.length > 50){
        throw new Error('length of lastName is invalid')
    }
    else if(!validator.isEmail(emailId)){
        throw new Error('invalid Email')
    }
    else if (!validator.isStrongPassword(password)){
        throw new Error('Password is not Strong Enough')
    }
}

module.exports={signupValidator}