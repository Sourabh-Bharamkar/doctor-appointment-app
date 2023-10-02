const Sequelize=require('sequelize')
const sequelize=require('../util/database')


const Appointment=sequelize.define('appointment',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    date:{
        type:Sequelize.STRING,
        allowNull:false
    },
    time:{
        type:Sequelize.STRING,
        allowNull:false
    },
    status:{
        type:Sequelize.STRING,
        allowNull:false
    }

})

module.exports=Appointment;