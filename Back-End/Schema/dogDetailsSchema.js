const mongoose = require("mongoose");
const validator = require("validator");

const dogSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    breed: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: true,
    },
    vaccinated: {
        type: Boolean,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    picture_link: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return validator.isURL(v, { protocols: ["http", "https"], require_protocol: true });
            },
            message: props => `${props.value} is not a valid URL!`
        }
    },
    adoption_status: {
        type: String,
        enum: ["Available", "Adopted", "Pending"],
        default: "Available",
        required: true,
    }
});

const DogModel = mongoose.model("Dog", dogSchema);

module.exports = { DogModel };
