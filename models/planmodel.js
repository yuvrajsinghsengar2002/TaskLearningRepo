// mongoose ke through connect mongodb 
const mongoose=require('mongoose');
const emailValidator=require('email-validator');
const bcrypt=require('bcrypt');
const crypto=require('crypto');
const { stringify } = require('querystring');
const { mainModule } = require('process');
// mongo pass=fRBAoGy1TUtnvi1p
const  db_link='mongodb+srv://Yuvraj_Singh_Sengar:fRBAoGy1TUtnvi1p@cluster0.sv9mdpw.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(db_link)
    .then(function(db){
        console.log(db);
       console.log('plan db connected');
    })
    .catch(function(err){
        console.log(err);
    })

    const planSchema=new mongoose.Schema({
        name:{
            type:String,
            required:true,
            unique:true,
            maxlength:[20,'plan name should not exceed 20 characters']
        },
        duration:{
            type:Number,
            required:true
        },
        price:{
            type:Number,
            required:[true,'price not entered']
        },
        ratingsAverage:{
            type:Number
        },
        discount:{
            type:Number,
            validate:[function(){
                return this.discount<100
            },'discount can not exceed price']
        }
    });
    const planModel=mongoose.model('planModel',planSchema);
    // (async function createPlan()
    // {
    //     let planObj={
    //         name:"superfood",
    //         duration:30,
    //         price:1000,
    //         ratingsAverage:5,
    //         discount:20
    //     }
    // let data=await planModel.create(planObj);

    // const doc=new planModel(planObj);
    // await doc.save();
    // })();
    
  module.exports=planModel;
    