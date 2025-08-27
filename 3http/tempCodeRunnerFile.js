const http = require('node:http');


http.createServer(function(req,res){
    if (req.url==='/'){
        res.end('home')
    }else if(req.url==='/profile'){
        res.end('profile page')
    }else{
        res.end('Page not Found')
    }
})