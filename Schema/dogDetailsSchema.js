const mongoose = require("mongoose");

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
                // Basic URL validation using regex
                return /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm.test(v);
            },
            message: props => `${props.value} is not a valid URL!`
        }
    }
});

const DogModel = mongoose.model("Dog", dogSchema);

module.exports = { DogModel };

