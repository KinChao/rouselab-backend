require('dotenv').config()


const express = require('express')
const mongoose = require('mongoose')


const peopleRoutes = require('./routes/peoples')
const userRoutes = require('./routes/user')
const newsRoutes = require('./routes/newss')

const app = express()

let cors = require("cors");
app.use(cors());

app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
  next(); 
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



