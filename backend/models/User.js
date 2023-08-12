const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique:true,
    },
    password:{
        type:String,
        required: true,
    },
    role:{
        type:String,
        default:'patient',
        enum:['patient','doctor', 'admin'],
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    otp: {
        type: String,
        default: null,
    },
    // otpExpiration: {
    //     type: Date,
    //     default: null,
    // }
});

const User = mongoose.model('User',userSchema);

module.exports= User;