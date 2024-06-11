const { required } = require('joi');
const mongoose = require('mongoose');

const adminSchema =  mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    profilePicture: {
        type: String
    },
    isAdmin:{
        type: Boolean,
        default:true
    },
    reference:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'accessories'
    }
})

const adminModel = mongoose.model('admin', adminSchema);
module.exports = adminModel;