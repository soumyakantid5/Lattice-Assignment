const psychiatristModel = require("../models/psychiatristModel");
const hospitalModel = require("../models/hospitalModel");
const {isValidRequest,isValidName} = require("../util/validator");

const createPsychiatrist = async (req,res) => {
    try{
        const {name,hospitalId} = req.body;

        if(!isValidRequest(req.body)){
            return res.status(400).send({status:false,message:"Enter all the details"});
        }

        if(!name){
            return res.status(400).send({status:false,message:"Enter Psychiatrist Name "});
        }
        if(!isValidName(name)){
            return res.status(400).send({status:false,message:"Enter valid Name "});
        }

        if(!hospitalId){
            return res.status(400).send({status:false,message:"Enter Hospital Id "});
        }
        if(isNaN(hospitalId)){
            return res.status(400).send({status:false,message:"Hospital Id should be a number"})
        }

        let hospitalData=await hospitalModel.findOne({_id:hospitalId})
        if(!hospitalData) {
            return res.status(400).send({status:false,message:"Hospital Id is not correct"})
        }

        let data = await psychiatristModel.create(req.body);
        return res.status(201).send({status:true,message:data})
    }
    catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
}

module.exports = {createPsychiatrist}