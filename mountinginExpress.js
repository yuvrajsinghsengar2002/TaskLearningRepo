const express=require("express");
const app=express();// an object of express module is formed
// middleware function ->post,front->json
app.use(express.json());
app.listen(3000);
let users=[
    {
        'id':1,
        'name':"abhisek"
    },
    {
        'id':2,
        'name':"abhay"
    },
    {
        'id':3,
        'name':"aman"
    }
];


const userRouter=express.Router();
app.use('/user',userRouter);


userRouter
.route('/')
.get(getuser)
.post(postuser)
.patch(updateUser)
.delete(deleteUser)

userRouter.route('/:id').get(getUserbyId);


function getuser(req,res){
    console.log(req.query);
    res.send(users);
}

function postuser(req,res){
    console.log(req.body);
    users=req.body;
    res.json({
        Messsage:"message sent successfully",
        users:req.body
      })
}

 function updateUser(req,res)
 {
    console.log('req body-> ',req.body);
    //update data in users
    let Datatobeupdated=req.body;
    for(key in Datatobeupdated)
    {
        users[key]=Datatobeupdated[key];
    }
    res.json({
        message:"data updated successfully"
    })
}

function deleteUser(req,res)
{
    users={}
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