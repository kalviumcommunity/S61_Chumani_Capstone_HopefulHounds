const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    hospitals: [
        {
            name: {
                type: String,
                required: true,
            },
            address: {
                street: {
                    type: String,
                    required: true,
                },
                colony: {
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
        },
    ],
});

const HospitalsModel = mongoose.model("Hospitals", hospitalSchema);

module.exports = { HospitalsModel };
