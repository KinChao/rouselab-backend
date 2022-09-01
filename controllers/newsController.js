const News = require('../models/newsModel')
const mongoose = require('mongoose')

// get all workouts
const getWorkouts = async (req, res) => {
    const newss = await News.find({}).sort({createdAt: -1})

    res.status(200).json(newss)
}


// get a single workout
const getWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    const news = await News.findById(id)

    if (!news) {
        return res.status(404).json({error: 'No such workout'})
    }

    res.status(200).json(news)
}


// create new workout
const createWorkout = async (req, res) => {
    const { title, description, photo} = req.body
    let emptyFields = []

    if(!title){
        emptyFields.push('title')
    }
    if(!description){
        emptyFields.push('description')
    }
    

    if(emptyFields.length >0) {
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }

    try {
        const news = await News.create({title, description, photo})
        res.status(200).json(news)
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

    const news = await News.findOneAndDelete({_id: id})

    if (!news) {
        return res.status(404).json({error: 'No such workout'})
    }

    res.status(200).json(news)
}


// update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }
    
    const news = await News.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!news) {
        return res.status(404).json({error: 'No such workout'})
    }

    res.status(200).json(news)
}

module.exports = {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
}