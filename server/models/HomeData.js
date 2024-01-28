const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    message: {
        type: String
    }
}
)

module.exports = mongoose.model("HomeData", DataSchema)