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











app.get('/users',(req,res)=>{
    console.log(req.query);
    res.send(users);
})

app.post('/users',(req,res)=>{
    console.log(req.body);
    users=req.body;
    res.json({
        Messsage:"message sent successfully",
        users:req.body
    })
});

// update->patches

app.patch('/users',(req,res)=>{
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
})

// to deletedata

app.delete('/users',(req,res)=>{
    users={}
    res.json({
        message:"the data has been deleted"
    })
})

// params
app.get('/users/:username',(req,res)=>{
    console.log(req.params.username);
    console.log(req.params);

    res.send("user id is recieved");
   
})



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