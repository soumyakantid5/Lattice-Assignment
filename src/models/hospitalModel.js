const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const hospitalSchema = new mongoose.Schema({
    _id:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    
},
{
    timestamps:false, versionKey:false
})

module.exports = mongoose.model('hospital',hospitalSchema);