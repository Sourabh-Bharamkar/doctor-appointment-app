const Sequelize=require('sequelize')
const sequelize=require('../util/database')


const Patient=sequelize.define('patient',{
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
        unique:true,
        allowNull:false
    },
    phone:{
        type:Sequelize.STRING,
        unique:true,
        allowNull:false
    },
    address:{
        type:Sequelize.TEXT,
        allowNull:false
    }
})

module.exports=Patient;