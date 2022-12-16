const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const patient_schema = new mongoose.Schema({
    name:{
        type:String,
        required:"Enter Patient Name",
        trim:true,
    },
    address:{
        type:String,
        required:"Enter Valid Address",
        trim:true,
    },
    email:{
        type:String,
        required:"Enter your Email",
        trim:true,
    },
    phone:{
        type:String,
        required:"Enter Phone Number with country code",
        trim:true,
    },
    password:{
        type:String,
        required:"must contain one upper character, one lower character and a number, 8 to 15 chars long",
        trim:true,
    },
    photo:{
        type:String,
        required:"Enter your Photo",
        trim:true,
    },
    psychiatristId:{
        type:ObjectId,
        required:true,
        ref:'psychiatrist'
    },
    hospitalId:{
        type:Number,
        required:true,
        ref:'hospital'
    }
},
{timestamps:true,versionKey:false});

module.exports = mongoose.model('patient',patient_schema);

