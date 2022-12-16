
const patientModel = require("../models/patientModel");
const psychiatristModel = require("../models/psychiatristModel");
const hospitalModel = require("../models/hospitalModel");
const {uploadFile} = require("../util/aws-config");
const {isValidRequest, isValidName, isValidAddress, isValidEmail, isValidPhone, isValidPassword,isValidPhoto,isValidObjectId} = require("../util/validator")

//=====================================Patient Registration API=======================================//

const patientregister = async (req,res)=>{
   
    try{
        const data = req.body;
        const {name,address,email,phone,password,psychiatristId,hospitalId} = data;
        let photo = req.files;

        if(!isValidRequest(data)) {
            return res.status(400).send({status:false,message:"Enter all the details"});
        }
        if(!isValidName(name)){
            return res.status(400).send({status:false,message:"Enter valid Name "});
        }
        if(!isValidAddress(address)){
            return res.status(400).send({status:false,message:"Enter valid Address "});
        }
        if(!isValidEmail(email)){
            return res.status(400).send({status:false,message:"Enter valid Email "});
        }
        
        if(phone) {
            if(!isValidPhone(phone)){
                return res.status(400).send({status:false,message:"Enter valid Phone Number "});
            }
            let duplicatePhone = await patientModel.findOne({phone})
            if(duplicatePhone)  return res.status(400).send({status:false,message:"Phone Number should be unique "});
        }
        if(!isValidPassword(password)){
            return res.status(400).send({status:false,message:"Enter valid Password "});
        }

        if(!isValidPhoto(photo)){
            return res.status(400).send({status:false,message:"Enter valid Photo "});
        }
        data.photo = await uploadFile(photo[0]);


        if(!psychiatristId){
            return res.status(400).send({status:false,message:"Enter Psychiatrist Id "});
        }
        if(!isValidObjectId(psychiatristId)){
            return res.status(400).send({status:false,message:"Psychiatrist Id is not valid object id"});
        }

        let psychiatristData=await psychiatristModel.findOne({_id:psychiatristId})
        if(!psychiatristData) {
            return res.status(400).send({status:false,message:"Psychiatrist Id is not correct"});
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

        if(psychiatristData.hospitalId!==hospitalData._id){
            return res.status(400).send({status:false,message:"Psychiatrist doesn't work in this hospital"});
        }
        
        const savedData = await patientModel.create(data);
        return res.status(201).send({status:true,message:savedData});
        
    }
    catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
}

module.exports = {patientregister}