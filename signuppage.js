const express=require("express");
const app=express();// an object of express module is formed
const cookieParser=require('cookie-parser');
const planModel=require('./models/planmodel');
// middleware function ->post,front->json
app.use(express.json());
app.listen(3000);
app.use(cookieParser());
// let users=[
//     {
//         'id':1,
//         'name':"abhisek"
//     },
//     {
//         'id':2,
//         'name':"abhay"
//     },
//     {
//         'id':3,
//         'name':"aman"
//     }
// ];

//mini app
const userRouter=require('./routers/userRoutermain');
const planRouter=require('./routers/planRouter');
const reviewRouter=require('./routers/reviewRouter');

// const reviewRouter=require('./routers/reviewRouter');
// base route,router to use
app.use('/user',userRouter);
app.use('/plans',planRouter);
app.use('/reviews',reviewRouter);
// app.use('/review',reviewRouter);


