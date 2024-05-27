// validation.js
const Joi = require('joi');

const allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif'];
const maxFileSize = 5 * 1024 * 1024; // 5 mb

const registerSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    profilePicture: Joi.any().custom((value, helpers) => {
        if(!value) return helpers.message('Profile picture is required');
        if(!allowedFileTypes.includes(value.mimetype)){
            return helpers.message('Invalid file type.  Allowed types: jped, png, gif');
        }
        if(value.size>maxFileSize){
            return helpers.message(`File size should be less than ${maxFileSize / (1024*1024)} MB`);
        }
        return value;
    }, 'Profile picture validation')
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

module.exports = { registerSchema, loginSchema };
