const adminAuth=(req,res,next)=>{
    const token='abcd'
    const isAuthorized=token==='abcd'
    if (isAuthorized){
        console.log('authorization checked for /admin')
        // res.send('hello')
        next()
    }else{
        res.status(401).send('not authorized')
    }
}

const userAuth=(req,res,next)=>{
    const token='abcd'
    const isAuthorized=token==='abcd'
    if (isAuthorized){
        console.log('authorization checked for /user')
        next()
    }else{
        res.status(401).send('not authorized')
    }
}

module.exports={adminAuth,userAuth}