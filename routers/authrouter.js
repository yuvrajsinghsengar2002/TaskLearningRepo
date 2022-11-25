const express=require("express");
const userModel=require('C:/Users/yuvra/OneDrive/Desktop/backend pepcoding/usermodel.js');
const authRouter=express.Router();
const jwt=require('jsonwebtoken');
const jwt_key='hkflgksv3lfhkbsj';
authRouter
.route('/signup')
.get(middleware,getsignup,middleware2)
.post(postsignup)
authRouter
.route('/login')
.post(loginUser)
function middleware(req,res,next){
    console.log('middleware encountered');
    next();
}
function middleware2(req,res,next){
    console.log('middleware2 encountered');
    // next();
    console.log('middleware2 ended the cycle.');
    res.sendFile('/public/index.html',{root:__dirname});
}
function getsignup(req,res,next){
    // console.log('get signup called');
    // next();
    //   res.sendFile('/public/index.html',{root:__dirname});
}

async function postsignup(req,res){
    let dataobj=req.body;
    let user=await userModel.create(dataobj);
    res.json({
        message:"user signed up",
        data:user
    });
}

async function loginUser(req,res)
{
try{
let data=req.body;
let user=await userModel.findOne({email:data.email});
if(user)
{  //bcrypt -> compare
   if(user.password==data.password)
      {   let uid=user['_id'];
        //   res.cookie('isLoggedIn',true);
          let token=jwt.sign({payload:uid},jwt_key);
          res.cookie('login',token,{httponly:true});
        return res.json({
        message:"user has logged in",
        data:user
      })
   }
   else{
    return res.json({
       message:"invalid password"
    })
   }
}
else{
    return res.json({
        message:"user not found"
    })
  }
}
catch(err){
return res.json({
    message:err.message
})
}
}

module.exports=authRouter