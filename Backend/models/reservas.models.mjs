import {
    DataTypes
} from "sequelize"
import connect from "../config/db.mjs"


//Modelo reservas 
 const reservas = connect.define('reservas', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fechaInicio: {
        type: DataTypes.DATE,
        allowNull: false
    },
    fechaFin: {
        type: DataTypes.DATE,
        allowNull: false
    },
    numeroPersonas: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    estado: {
        type: DataTypes.ENUM("active", "inactive"),
        allowNull: false,
        defaultValue: "active"
    },
    clienteID:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
    
})

export default reservas