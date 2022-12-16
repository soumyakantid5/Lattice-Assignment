const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const psychiatristSchema = new mongoose.Schema({
    
    name:{
        type:String,
        required:true
    },
    hospitalId:{
        type:Number,
        required:true,
        ref:'hospital'
    },
    
},
{
    timestamps:false, versionKey:false
});

module.exports = mongoose.model('psychiatrist',psychiatristSchema);