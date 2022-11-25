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
    })
// schema of the database
const userSchema=mongoose.Schema({
    name:{type:String,
    required:true},
    email:{
        type:String,
        required: true,
        unique:true,
        validate:function(){
            return emailValidator.validate(this.email);
        }
    },
    password:{
        type:String,
        required:true,minlength:8
    },
    confirmPassword:{
        type:String,
        required:true,
        minlength:8,
        validate: function(){
     return this.confirmPassword==this.password;
        }
    },
     role:{
        type:String,
        enum:['admin','user','restraurantowner','deliveryboy'],
        default:'user'
     },
    profileImage:{
      type:String,
      default:'./img.jpeg'
     },
     resetToken:String
});

//attaching methods with the schema
userSchema.methods.createResetToken=function()
{  // creating unique token using npm i crypto
  const resetToken=crypto.randomBytes(32).toString("hex");
  this.resetToken=resetToken;
  return resetToken;
}

userSchema.methods.resetPasswordHandler=function(password,confirmPassword)
{
    this.password=password;
    this.confirmPassword=confirmPassword;
    this.resetToken=undefined;
}

// before save hooks
userSchema.pre('save', function(){
    this.confirmPassword=undefined;// this will prevent the  confirmpassword to be saved on database and reduce memiry   consumption
    console.log('before saving in db')
});

// // after save hooks 
// userSchema.post('save',function(){
//     console.log('after saving in db')
// });
// userSchema.pre('save',async function(){
//     console.log('beforesaving ')
//     let salt=await bcrypt.genSalt();
//     let hashedString=await bcrypt.hash(this.password,salt);
//     this.password=hashedString;
//     console.log(hashedString);
// })
// model
const userModel=mongoose.model('userModel',userSchema);
module.exports=userModel;

// (async function createUser(){
//     let user={
//         name:'jasbir',email:'abc@gmail.com',password:'1234567',confirmPassword:'1234567'
//     };
//     let data= await userModel.create(user);
//     console.log(data);
// })();