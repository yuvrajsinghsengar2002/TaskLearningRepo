// const { fromPairs } = require("lodash");
const planModel = require("C:/Users/yuvra/OneDrive/Desktop/backend pepcoding/models/planmodel");


module.exports.getAllPlans = async function getAllPlans(req, res) {
    try {
        let plans = await planModel.find();
        if (plans) {
            return res.json({
                message: 'all plans retrieved',
                data: plans
            })
        }
        else {
            return res.json({
                message: 'plans not found'
            })
        }
    }
    catch {
        res.status(500).json({
            message: err.message
        })
    }
}

module.exports.getPlan = async function getPlan(req,res){
    try {
        let id = req.params.id;
        let plan = await planModel.findById(id);
        if (plan) {
            return res.json({
                message: 'plan retrieved',
                data: plan
            })
        }
        else {
            return res.json({
                message: 'plan not found'
            })
        }
    }
    catch {
        res.status(500).json({
            message: err.message
        })
    }
}

module.exports.createPlan = async function createPlan(req, res) {
    try {

        let planData = req.body;
        let createdPlan = await planModel.create(planData);
        return res.json({
            message: 'plan created successsfully', data: createdPlan
        })
    }
    catch (err) {
        res.status(500).json({
            message: err.messagge
        })
    }

}

module.exports.deletePlan = async function deletePlan(req, res) {
    try {
        let id = req.params.id;
        let deletedPlan = await planModel.findByIdAndDelete(id);
        return res.json({
            message: 'plan Deleted successsfully', data: deletedPlan
        })
    }
    catch (err) {
        res.status(500).json({
            message: err.messagge
        })
    }

}

module.exports.updatePlan = async function updatePlan(req, res) {
    try {
        let id = req.params.id;
        let dataToBeUpdated = req.body;
        let keys = [];
        for (let key in dataToBeUpdated) {
            keys.push(key);
        }
        let plan = await planModel.findById(id);
        for (let i = 0; i < keys.length; i++) {
            plan[keys[i]] = dataToBeUpdated[keys[i]];
        }
        await plan.save();
        return res.json({
            message:"plan updated successfully",
            data:plan
        })
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });

    }
}

// get top 3 plans

module.exports.top3Plans=async function topPlans(req,res)
{
    try{
    const Plans=await planModel.find().sort({ratingsAverage:-1}).limit(3);
    return res.json({
        message:'top 3 Plans',
        data:Plans
    })
    }
    catch(err)
    {
       res.status(500).json({
        message:err.message
       })
    }
}