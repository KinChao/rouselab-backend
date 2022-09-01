const mongoose = require('mongoose')


const Schema = mongoose.Schema

const peopleSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    affiliation: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    identifier: {
      type: String,
      required: true
    },
    selectedFile: {
      type: String
    } 
})

module.exports = mongoose.model('People', peopleSchema)