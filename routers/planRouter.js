const express=require("express");
const planRouter=express.Router();
const app=express();
const authController=require('../controller/authController');
const Controller=require('C:/Users/yuvra/OneDrive/Desktop/backend pepcoding/controller/planController.js');
const getPlan=Controller.getPlan;
const getAllPlans=Controller.getAllPlans;
const updatePlan=Controller.updatePlan;
const createPlan=Controller.createPlan;
const deletePlan=Controller.deletePlan;
const protectRoute=authController.protectRoute;
const isAuthorised=authController.isAuthorised;




planRouter
.route('/allPlans')
.get(getAllPlans)

// own  plan
planRouter.use(protectRoute);
planRouter
.route('/plan/:id')
.get(getPlan)



// only admin and restraunt owner can perform following operations.
// planRouter.use(isAuthorised['admin','restrauntOwner']);
planRouter
.route('/crudPlan')
.post(createPlan)
.patch(updatePlan)
.delete(deletePlan)


module.exports=planRouter;