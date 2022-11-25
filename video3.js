/// server creation
// 1.http  module

const http=require('http');
const fs=require('fs');
const _=require('lodash');

const server = http.createServer((req,res)=>{
    console.log('request has been made from browser to server.');
    // console.log(req.method);
    // console.log(req.url);

    // Lodash
    let num=_.random(0,20);
    console.log(num);


     res.setHeader('content-type','text/html');
    //res.write('hello peepcoders! :)');
    // res.end();
    let path;
    switch(req.url){
        case '/':
            path='./index.html';
            res.statusCode=200;
            break;
        case '/about':
            path='./about.html';
            res.statusCode=200;
            break;
        case 'about-me':
            res.statusCode=301;
            res.setHeader('location','/about');
            default:
            path+='/404.html';
            res.statusCode=404;
    };

    fs.readFile(path,(err,fileData)=>{
        if(err)
        {
            console.log(err);
        }
        else{
            res.write(fileData);
            res.end();
        }
    })
    
})


// port number ,host , callback
server.listen(3000,'localhost',()=>{
  console.log('server is listening on port 3000');

});