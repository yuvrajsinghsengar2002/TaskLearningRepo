const userModel=require('C:/Users/yuvra/OneDrive/Desktop/backend pepcoding/usermodel.js');

module.exports.getUser=async function getuser(req,res){
    // console.log(req.query);
    let id=req.params._id;
    let user=await userModel.findById(id);// find() will bring all the data from user model.
    // let user=await userModel.findOne({name:'abhisek'});
    if(user)
    {
        return res.json(user);
    }
    else
    {
        return res.json({
            message:'user not found'
        })
    }
}

module.exports.updateUser=async function updateUser(req,res)
{  try{
    let id=req.params.id;
   let Datatobeupdated=req.body;
   let user=await userModel.findById(id);
   if(user)
   {
    const keys=[];
    for(let key in Datatobeupdated){
        keys.push(key);
    }
    for(let i=0;i<keys.length;i++)
    {
        user[keys[i]]=Datatobeupdated[keys[i]];
    }
    const updatedData=await user.save();   
    res.json({
        message:'data  updated successfully',
        data:user
    })  
    }
   else{
    res.json({
        message:'user does not exist'
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

module.exports.deleteUser=async function deleteUser(req,res)
{  try{
    let id=req.params.id;
      let user=await userModel.findByIdAndDelete(id);
    if(!user)
    {
      res.json({
        message:"user not found"
    })    
   }
   else{
    res.json({
        messgae:'user deleted successfully.'
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

module.exports.getAllUser=async function getAllUser(req,res){
   try{ 
      let allusers=await userModel.find();// find() will bring all the data from user model.
      if(users)
       { res.json({
        message:'list of all users', 
        data:allusers
       })
      }
      else{
        res.json({
            message:"no user found"
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

module.exports.updateProfileImage=function updateProfileImage(req,res){
    res.json({
        message:"file uploaded successfully"
    });
}
