const express=require('express');
const { createHospital,getHospitalDetails } = require('../controllers/hospitalController');
const {createPsychiatrist} = require('../controllers/psychiatristController')
const route = express.Router();
const patientController = require("../controllers/patientController");

route.post("/patientregister",patientController.patientregister);
route.post("/createpsycriatrist",createPsychiatrist)
route.post('/createhospital',createHospital);
route.get("/gethospitaldetails",getHospitalDetails)
module.exports = route;