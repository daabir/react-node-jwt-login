const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    firstLoad: {
        type: String,
    },
    secondLoad: {
        type: String,
    }
},{timestamps: true}
)

module.exports = mongoose.model("HomeData", DataSchema)