const express=require("express");
const multer=require('multer');
const userRouter=express.Router();
const app=express();

// const userModel=require('C:/Users/yuvra/OneDrive/Desktop/backend pepcoding/usermodel.js');

const controller=require('../controller/userController');
// const { application } = require("express");
const updateUser=controller.updateUser;
const deleteUser=controller.deleteUser;
const getAllUser=controller.getAllUser;
const getUser=controller.getUser;


const authcontroller=require('../controller/authController');
const { filter } = require("lodash");
const signUp=authcontroller.signUp;
const login=authcontroller.login;
const logout=authcontroller.logout;
const isAuthorised=authcontroller.isAuthorised;
const protectRoute=authcontroller.protectRoute;
const forgetpassword=authcontroller.forgetPassword;
const resetpassword=authcontroller.resetPassword;
// User ke  options
userRouter.route('/id')
.patch(updateUser)
.delete(deleteUser)

// user signup
userRouter
.route('/signUp')
.post(signUp)

// user login
userRouter
.route('/login')
.get(login)

userRouter
.route('/forgetPassword')
.post(forgetpassword)

userRouter
.route('/resetpassword/:token')
.post(resetpassword)

// multer for file upload

// upload->storage,filter
const multerStorage=multer.diskStorage({
    destination:function(req,file,cb){
    cb(null,'C:/Users/yuvra/OneDrive/Desktop/backend pepcoding/images')},
    filename:function(req,file,cb){
        cb(null,`user-${Date.now()}.jpeg`)
    }
});

const Filter= function(req,file,cb){
    if(file.mimetype.startsWith("image")){
        cb(null,true)
    }else{
        cb(new Error("Not an image! please upload an image"))
    }
};

const upload =multer({
    storage:multerStorage,
    fileFilter:Filter
});





//logout
userRouter
.route('/logout')
.get(logout)
//profilepage
userRouter.use(protectRoute);
userRouter
.route('/userProfile')
.get(getUser)
//

userRouter.post("/ProfileImage",upload.single("photo"),controller.updateProfileImage)
userRouter.get('/ProfileImage',(req,res)=>{
    res.sendFile("C:/Users/yuvra/OneDrive/Desktop/backend pepcoding/multer.html")
})

// admin specific funtion
app.use(isAuthorised(['admin']));
userRouter
.route('')
.get(getAllUser)

module.exports=userRouter;