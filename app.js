//importing required packages
const express = require('express')
const app = express();
const bodyParser=require('body-parser')


const sequelize = require('./util/database.js')

//importing models
const Doctor=require('./models/doctor.js')
const Patient=require('./models/patient.js')
const Appointment=require('./models/appointment.js')


//importing required routes and middlewares
const doctorRoutes = require('./routes/doctor')
const appointmentRoutes=require('./routes/appointment.js')
const userRoutes=require('./routes/user.js')

const pageNotFoundMiddleware = require('./middlewares/404')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(userRoutes)
app.use(doctorRoutes)
app.use(appointmentRoutes)
app.use(pageNotFoundMiddleware)


//defining tabale relationships
Doctor.hasMany(Appointment)
Appointment.belongsTo(Doctor)

Patient.hasMany(Appointment)
Appointment.belongsTo(Patient)



sequelize.sync()
    .then(() => {
        app.listen(3000, () => {
            console.log('App is listening on port 3000')
        })
    }).catch((err) => {
        console.log(err)
    })


