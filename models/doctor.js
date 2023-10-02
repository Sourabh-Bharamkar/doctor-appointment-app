const Sequelize=require('sequelize')
const sequelize=require('../util/database')

const Doctor=sequelize.define('doctor',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    phone:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    location:{
        type:Sequelize.STRING,
        allowNull:false
        
    },
    speciality:{
        type:Sequelize.STRING,
        allowNull:false
    },
    maxPatientsPerDay:{
        type:Sequelize.INTEGER,
        allowNull:false
    }
})

module.exports=Doctor;