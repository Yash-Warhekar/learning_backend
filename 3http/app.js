const http = require('node:http');


server=http.createServer(function(req,res){
    console.log(req.url==='/');
    if (req.url==='/'){
        res.end('home')
    }else if(req.url==='/profile'){
        res.end('profile page')
    }else{
        res.end('Page not Found')
    }
})

server.listen(3000)