const mongoose = require('mongoose');
const Schema = mongoose.Schema; // shorthand notation

const qrSchema=new Schema({
    enrollment_id:String,
    name:String,
    qrcodeembed:String,
    scanned:{
        type: Boolean,
        defalut:false
    },
    email:String
})

module.exports=mongoose.model('QR',qrSchema);