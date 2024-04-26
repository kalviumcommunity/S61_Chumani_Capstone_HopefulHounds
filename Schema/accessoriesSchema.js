const mongoose = require("mongoose");

const imageLinksSchema = new mongoose.Schema({
    image_links: {
        type: [String],
        required: true,
        validate: {
            validator: function(v) {
                // Basic URL validation using regex
                const urlRegex = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm;
                return v.every(link => urlRegex.test(link));
            },
            message: props => `${props.value} is not a valid URL!`
        }
    }
});

const ImageLinksModel = mongoose.model("ImageLinks", imageLinksSchema);

module.exports = { ImageLinksModel };
