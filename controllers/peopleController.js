const People = require('../models/peopleModel')
const mongoose = require('mongoose')

// get all workouts
const getWorkouts = async (req, res) => {
    const peoples = await People.find({}).sort({createdAt: -1})

    res.status(200).json(peoples)
}


// get a single workout
const getWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    const people = await People.findById(id)

    if (!people) {
        return res.status(404).json({error: 'No such workout'})
    }

    res.status(200).json(people)
}


// create new workout
const createWorkout = async (req, res) => {
    const { name, role, affiliation, description, email, identifier, selectedFile} = req.body
    let emptyFields = []

    if(!name){
        emptyFields.push('name')
    }
    if(!role){
        emptyFields.push('role')
    }
    if(!affiliation){
        emptyFields.push('affiliation')
    }
    if(!description){
      emptyFields.push('description')
    }
    if(!email){
      emptyFields.push('email')
    }


    if(emptyFields.length >0) {
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }

    try {
        const people = await People.create({name, role, affiliation, description, email, identifier, selectedFile})
        res.status(200).json(people)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


// delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    const people = await People.findOneAndDelete({_id: id})

    if (!people) {
        return res.status(404).json({error: 'No such workout'})
    }

    res.status(200).json(people)
}


// update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }
    
    const people = await People.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!people) {
        return res.status(404).json({error: 'No such workout'})
    }

    res.status(200).json(people)
}

module.exports = {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
}