const hospitalModel = require("../models/hospitalModel");
const patientModel = require("../models/patientModel");
const psychiatristModel = require("../models/psychiatristModel");
const { isValidRequest, isValidAddress } = require("../util/validator");

const createHospital = async (req, res) => {
  try {
    const { _id, name } = req.body;

    if (!isValidRequest(req.body)) {
      return res.status(400).send({ status: false, message: "Enter all the details" });
    }
    if (_id == null) {
      return res.status(400).send({ status: false, message: "Enter Hospital Id " });
    }
    if (isNaN(_id)) {
      return res.status(400).send({ status: false, message: "Hospital Id should be a number" });
    }

    let duplicateId = await hospitalModel.findOne({ _id });
    if (duplicateId) {
      return res.status(400).send({ status: false, message: "Hospital Id already Exists" });
    }

    if (!name) {
      return res.status(400).send({ status: false, message: "Enter Hospital Name " });
    }
    if (!isValidAddress(name)) {
      return res.status(400).send({ status: false, message: "Enter valid Hospital Name " });
    }
    let duplicateName = await hospitalModel.findOne({ name });
    if (duplicateName) {
      return res.status(400).send({ status: false, message: "Hospital Name already Exists" });
    }
    let data = await hospitalModel.create(req.body);
    return res.status(201).send({ status: true, message: data });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};




const getHospitalDetails = async (req, res) => {
  try {
    const _id = req.body.id;
    let finalData = {};
    let psychiatristCount = await psychiatristModel.find({ hospitalId: _id }).count()

    let patientDetails = await patientModel.find({ hospitalId: _id }).
    populate({path:'hospitalId',select:{'name':1},}).populate({path:'psychiatristId',select:{'name':1},});
   
    if(patientDetails.length==0)  {
      let hospitalData = await hospitalModel.findOne({ _id })
      finalData.hospitalName = hospitalData.name;
      finalData.totalPatient = patientDetails.length;
      finalData.psychiatristCount = psychiatristCount;
      return res.status(200).send({ status: false, message:finalData });
    }

    let temp=[],counter=0;

    for(let i=0;i<patientDetails.length;i++){
        if(!temp.includes(patientDetails[i].psychiatristId._id)){
            temp.push(patientDetails[i].psychiatristId._id);
           
    let count = await patientModel.find({ psychiatristId: patientDetails[i].psychiatristId._id }).count();
            let psychiatristData='psychiatristData'+counter;
            
            let _id = patientDetails[i].psychiatristId._id.toString();
            let name = patientDetails[i].psychiatristId.name;
            
            finalData[psychiatristData] = {};
            finalData[psychiatristData]._id = _id;
            finalData[psychiatristData].name = name;
            finalData[psychiatristData].patientCount = count;
            
            counter++;
        }
    }


    finalData.hospitalName = patientDetails[0].hospitalId.name;
    finalData.totalPatient = patientDetails.length;
    finalData.psychiatristCount = psychiatristCount;

    return res.status(201).send({ status: true, message: finalData });
  } 
  catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

module.exports = { createHospital, getHospitalDetails };
