const express=require('express');

const app=express();// an object of express module is formed
app.listen(3000);
app.get('/', (req,res)=>{
    res.sendFile('C:/Users/yuvra/OneDrive/Desktop/backend pepcoding/index.html')
});
app.get('/about', (req,res)=>{
    res.sendFile('./about.html',{root:__dirname});
});
// redirects
app.get('/about-us',(req,res)=>{
    res.redirect('/about');
})