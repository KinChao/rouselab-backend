const mongoose = require('mongoose')


const Schema = mongoose.Schema

const newsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    photo: {
      type: String
    } 
}, { timestamps: true })

module.exports = mongoose.model('News', newsSchema)