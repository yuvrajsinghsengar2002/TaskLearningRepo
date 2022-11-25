const jwt=require('jsonwebtoken');
const jwt_key='hkflgksv3lfhkbsj';

function protectRoute(req,res,next){
    if(req.cookies.login){
       let isVerified=jwt.verify(req.cookies.login,jwt_key)        
        
       if(isVerified)
       {next();}
       else{
        return res.json({
            message:"user not verified"
        })
       }
    }
    else 
    {
        return res.json({
            message:'please login first'
          });
    }
    
    }
module.exports=protectRoute;    