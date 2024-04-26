const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: {
            street: {
                type: String,
                required: true,
            },
            colony: {
                type: String,
                required: false,
            },
            city: {
                type: String,
                required: true,
            },
            state: {
                type: String,
                required: true,
            },
            pin_code: {
                type: String,
                required: true,
            },
            phone: {
                type: String,
                required: true,
            },
        },
        required: true,
    },
});

const HospitalsModel = mongoose.model("MumbaiHospitals", hospitalSchema);

module.exports = { HospitalsModel };
