const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    data: {
        type: String
    }
}
)

module.exports = mongoose.model("HomeData", DataSchema)