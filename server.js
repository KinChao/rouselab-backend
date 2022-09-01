require('dotenv').config()
import peopleModel from './models/peopleModel'

const express = require('express')
const mongoose = require('mongoose')


const peopleRoutes = require('./routes/peoples')
const userRoutes = require('./routes/user')
const newsRoutes = require('./routes/newss')

const app = express()



app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb'}));


app.use( (req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/peoples/', peopleRoutes)
app.use('/api/user', userRoutes)
app.use('/api/newss/', newsRoutes)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
}


app.get('/read', (req,res) => {
  peopleModel.find({}, (err, result) => {
    if (err) {
      res.send(err)
    } else {
      res.send(result)
    }
  })

})


// connect do db
mongoose.connect(process.env.MONGO_URI)
  .then ( ()=> {
    app.listen(process.env.PORT, () => {
      console.log("You are connected!")
    })
  })
  .catch( (error) => {
      console.log(error)
  })



