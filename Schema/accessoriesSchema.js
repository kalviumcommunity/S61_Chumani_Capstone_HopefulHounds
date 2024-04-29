const mongoose = require("mongoose");
const validator = require("validator");

const accessoriesSchema = new mongoose.Schema({
    image_links: {
        type: [String],
        required: true,
        validate: {
            validator: function(v) {
                // Validate each URL using validator.isURL
                return v.every(url => validator.isURL(url));
            },
            message: props => `${props.value} is not a valid URL!`
        }
    }
});

const AccessoriesModel = mongoose.model("accessories", accessoriesSchema);

module.exports = { AccessoriesModel };

