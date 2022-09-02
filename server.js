require('dotenv').config()


const express = require('express')
const mongoose = require('mongoose')


const peopleRoutes = require('./routes/peoples')
const userRoutes = require('./routes/user')
const newsRoutes = require('./routes/newss')

const app = express()

let cors = require("cors");
app.use(cors());

app.options('/:id', cors()) // enable pre-flight request for GET request
app.get('/:id', cors(), function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

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



