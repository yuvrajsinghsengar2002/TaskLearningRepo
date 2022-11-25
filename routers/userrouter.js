const express=require("express");
const protectRoute=require('./authhelper');
const userRouter=express.Router();
const userModel=require('C:/Users/yuvra/OneDrive/Desktop/backend pepcoding/usermodel.js');

userRouter
.route('/')
.get(protectRoute,getuser)
.post(postuser)
.patch(updateUser)
.delete(deleteUser)

userRouter
.route('/getcookies')
.get(getCookies)

userRouter
.route('/setcookies')
.get(setCookies)


userRouter.route('/:id')
.get(getUserbyId);



async function getuser(req,res){
    // console.log(req.query);
    let allusers=await userModel.find();// find() will bring all the data from user model.
    // let user=await userModel.findOne({name:'abhisek'});
    res.json({
        message:'list of all users', 
        data:allusers
    })
}

function postuser(req,res){
    console.log(req.body);
    users=req.body;
    res.json({
        Messsage:"message sent successfully",
        users:req.body
      })
}

async function updateUser(req,res)
 {
    console.log('req body-> ',req.body);
    //update data in users
    let Datatobeupdated=req.body;
    let user=await userModel.findOneAndUpdate({email:'abc@gmail.com'},Datatobeupdated);
    
    // for(key in Datatobeupdated)
    // {
    //     users[key]=Datatobeupdated[key];
    // }
    res.json({
        message:"data updated successfully"
    })
}

async function deleteUser(req,res)
{
    // users={}
    let user=await userModel.findOneAndDelete({email:'kk@gmail.com'});
    res.json({
        message:"the data has been deleted"
    })
}
function getUserbyId(req,res){
    console.log(req.params.id);
    let paramId=req.params.id;
    let obj={};
    for(let i=0;i<users.length;i++){
        if(users[i]['id']==paramId)
        {
            obj=users[i];
        }
    }
    res.json({
        message:'req recieved',data:obj
    });
   
}

function setCookies(req,res){
    // res.setHeader('Set-Cookie','isLoggedIn');
    res.cookie('isLoggedIn',true,{maxage:24*60*60*1000,secure:true,httpOnly:true});
    res.send('cookie has been set');
}

function getCookies(req,res){
let cookies=req.cookies;
console.log(cookies);
}


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



module.exports=userRouter;
