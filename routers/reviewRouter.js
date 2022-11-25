const express=require("express");
const { get } = require("lodash");
const reviewRouter=express.Router();

const authcontroller=require('../controller/authController');
// const isAuthorised=authcontroller.isAuthorised;
const protectRoute=authcontroller.protectRoute;
const reviewController=require('../controller/reviewController');
const getAllReviews=reviewController.getAllReviews;
const getPlanReviews=reviewController.getPlanReviews;
const updateReview=reviewController.updateReview;
const createReview=reviewController.createReview;
const top3Reviews=reviewController.top3Reviews;
const deleteReview=reviewController.deleteReview;


reviewRouter
.route('/All')
.get(getAllReviews);

reviewRouter
.route('/top3')
.get(top3Reviews);

reviewRouter
.route('/:id')
get(getPlanReviews);


reviewRouter.use(protectRoute);
reviewRouter
.route('/crud/:plan')
.post(createReview)

reviewRouter
.route('crud/:id')
.patch(updateReview)
.delete(deleteReview)

module.exports=reviewRouter;