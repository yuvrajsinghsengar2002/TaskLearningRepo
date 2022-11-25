const express = require("express");
const userModel = require('C:/Users/yuvra/OneDrive/Desktop/backend pepcoding/usermodel.js');
// const authRouter = express.Router();
const jwt = require('jsonwebtoken');
const e = require("express");
const jwt_key = 'hkflgksv3lfhkbsj';

module.exports.signUp = async function signUp(req, res) {
    try {
        let dataobj = req.body;
        let user = await userModel.create(dataobj);
        if (user) {
           
            res.json({
                message: "user signed up",
                data:user
            });
        }
        else {
            res.json({
                message: 'some error while signing up'
            })
        }
    }
    catch (err) {
        res.json({
            message: err.message
        })
    }
}

module.exports.login = async function login(req, res) {
    try {
        let data = req.body;
        let user = await userModel.findOne({ email: data.email });
        if (user) {  //bcrypt -> compare
            if (user.password == data.password) {
                let uid = user['_id'];
                //   res.cookie('isLoggedIn',true);
                let token = jwt.sign({ payload: uid }, jwt_key);
                res.cookie('login', token, { httponly: true });
                return res.json({
                    message: "user has logged in",
                    data: user
                })
            }
            else {
                return res.json({
                    message: "invalid password"
                })
            }
        }
        else {
            return res.json({
                message: "user not found"
            })
        }
    }
    catch (err) {
        return res.json({
            message: err.message
        })
    }
}
// isAuthorised ->tocheck the users role
module.exports.isAuthorised = function isAuthorised(roles) {
    return function (req, res, next) {
        if (roles.include(req.role) == true) {
            next();
        }
        else {
            res.status(401).json({
                message: "user not allowed"
            })
        }
    }
}

// protect route

module.exports.protectRoute = async function protectRoute(req, res, next) {
    try {
        let token;
        if (req.cookies.login) {
            console.log(req.cookies);
            token = req.cookies.login;
            let payload = jwt.verify(req.cookies.login, jwt_key)
            if (payload) {
                console.log('payload token',payload)
                const user = await userModel.findById(payload.payload);
                req.role = user.role;
                req.id = user.id;

                next();
            }

            else {
                return res.json({
                    message: "user not verified"
                })
            }
        }
        else{
            //browser
            const client=req.get('User-Agent');
            if(client.includes("Mozilla")==true)
            {
                return res.redirect('/login');
            }
            // postman
            else{
            res.json({
                message:"please login first"
            })}
        }
    }
    catch (err) {
        return res.json({
            message: err.message
        });
    }

}

module.exports.forgetPassword= async function forgetPassword(req,res){
    let emailv=req.body;
    try{
        const user=userModel.findOne({email:emailv});
        if(user){
            // create resettoken is used to create new token
        const resetToken=user.createResetToken();
        http://abc.com/resetPassword/resetToken
      {  let resetPasswordLink=`${req.protocol}://${req.get('host')}/resetpassword/${resetToken}`;}
        // send email to the user through nodemailer
        }
        else{
            res.json({
            message:err.message
            })
        }
    }
    catch(err)
    {res.json({
        message:"please sign up first"
    })

    }
}

module.exports.resetPassword= async function(req,res)
{   try{
    const token=req.parmas.token;
    let{password,confirmPassword}=req.body;
    const user= await userModel.findOne({resetToken:token});
    // reset passwordHandler will update user in db
    if(user){
    user.resetPasswordHandler(password,confirmPassword)
    {
        await user.save();
        res.json({
            message:" password changed successfully.please login again"
        })
    }
      }

      else{
        res.json({
            message:'user not found'
        })
      }
     }

     catch(err)
     {
        res.json({
            message:err.message
        })
     }
}

module.exports.logout=function logout(req,res)
{
    res.cookie('login',' ',{maxAge:1});
    res.json({
        message:'user logged out successfully'
    })
}