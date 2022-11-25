const mongoose=require('mongoose');
const emailValidator=require('email-validator');
const bcrypt=require('bcrypt');
const crypto=require('crypto');
// mongo pass=fRBAoGy1TUtnvi1p
const  db_link='mongodb+srv://Yuvraj_Singh_Sengar:fRBAoGy1TUtnvi1p@cluster0.sv9mdpw.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(db_link)
    .then(function(db){
        console.log(db);
       console.log('db connected');
    })
    .catch(function(err){
        console.log(err);
    });

const reviewSchema=new mongoose.Schema({
    review:{
        type:String,required:[true,'review is required']
    },
    rating:{
        type:Number,
        min:1,
        max:10,required:[true,'rating is required']
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'usermodel',
        required:[true,'review must belong to a user']
    },
    plan:{
        type:mongoose.Schema.ObjectId,
        ref:'planModel',
        required:[true,'review must belong to a plan']
    }
});


reviewSchema.pre(/^find/,function(next)
{
    this.populate({
        path:"user",
        select:'name profileImage'
    }).populate("plan");
    next();
})

const reviewModel=mongoose.model('reviewModel',reviewSchema);
module.exports=reviewModel;