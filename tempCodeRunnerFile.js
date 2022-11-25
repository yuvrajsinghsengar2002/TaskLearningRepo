
module.exports.getuser=async function getuser(req,res){
    // console.log(req.query);
    let allusers=await userModel.find();// find() will bring all the data from user model.
    // let user=await userModel.findOne({name:'abhisek'});
    res.json({
        message:'list of all users', 
        data:allusers
    })
}

module.exports.postuser=function postuser(req,res){
    console.log(req.body);
    users=req.body;
    res.json({
        Messsage:"message sent successfully",
        users:req.body
      })
}

module.exports.updateuser =async function updateUser(req,res)
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

module.exports.deleteuser=async function deleteUser(req,res)
{
    // users={}
    let user=await userModel.findOneAndDelete({email:'kk@gmail.com'});
    res.json({
        message:"the data has been deleted"
    })
}
module.exports.getUserbyId=function getUserbyId(req,res){
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

module.exports.setCookies=function setCookies(req,res){
    // res.setHeader('Set-Cookie','isLoggedIn');
    res.cookie('isLoggedIn',true,{maxage:24*60*60*1000,secure:true,httpOnly:true});
    res.send('cookie has been set');
}

module.exports.getCookies=function getCookies(req,res){
let cookies=req.cookies;
console.log(cookies);
}


module.exports.middleware=function middleware(req,res,next){
    console.log('middleware encountered');
    next();
}
module.exports.middleware2=function middleware2(req,res,next){
    console.log('middleware2 encountered');
    // next();
    console.log('middleware2 ended the cycle.');
    res.sendFile('/public/index.html',{root:__dirname});
}
