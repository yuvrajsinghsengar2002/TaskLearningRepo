const planModel = require("../models/planmodel");
const reviewModel = require("../models/reviewModel");
// const updatePlan=require("../controller/planController").updatePlan;

module.exports.getAllReviews= async function getAllReviews(req,res)
{
    try{
        const reviews= await reviewModel.find();
        if(reviews){
            return  res.json({
                message:"reviews retrieved",
                data:reviews
            })
        }
        else{
            return res.json({
                message:'review not found'
            })
        }
    }
    catch(err)
    {
     return res.status(500).json({
        message:err.message
     })
    }
}
module.exports.top3Reviews= async function top3Reviews(req,res)
{
    try{
        const reviews= await reviewModel.find().sort({ratingsAverage:-1}).limit(3);
        if(reviews){
            return  res.json({
                message:"reviews retrieved",
                data:reviews
            })
        }
        else{
            return res.json({
                message:'reviews not found'
            })
        }
    }
    catch(err)
    {
     return res.status(500).json({
        message:err.message
     })
    }
}

module.exports.getPlanReviews= async function getPlanReviews(req,res)
{
    try{
        const id=req.params.id;
        const review= await reviewModel.findById(id);
        if(reviews){
            return  res.json({
                message:"review retrieved",
                data:review
            })
        }
        else{
            return res.json({
                message:'reviews not found'
            })
        }
    }
    catch(err)
    {
     return res.status(500).json({
        message:err.message
     })
    }
}

module.exports.createReview= async function createPlan(req,res){
    try{
        let id=req.body.id;
        let plan=await planModel.findById(id);
        let review=await reviewModel.create(req.body);
        
        res.json({
            message:"review created",
            data:review
        })
    }
    catch(err)
    {
        return res.json({
            message:err.message
        })
    }
}

module.exports.updateReview=async function updaateReview(req,res){
try{
let id=req.params.id;
let review=await reviewModel.findById(id);
let dataToBeUpdated = req.body;
let keys = [];
for (let key in dataToBeUpdated) {
    keys.push(key);
}

for (let i = 0; i < keys.length; i++) {
    review[keys[i]] = dataToBeUpdated[keys[i]];
}
await review.save();
return res.json({
    message:"review updated successfully",
    data:review
})
}
catch (err) {
    res.status(500).json({
        message: err.message
    });
}
}

module.exports.deleteReview=async function deleteReview(req,res){
    try {
        let id = req.params.id;
        let deletedreview = await reviewModel.findByIdAndDelete(id);
        return res.json({
            message: 'review Deleted successsfully', data: deletedreview
        })
    }
    catch (err) {
        res.status(500).json({
            message: err.messagge
        })
    }
}
