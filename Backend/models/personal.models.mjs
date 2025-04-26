import { DataTypes } from 'sequelize'
import connect from '../config/db.mjs'

//Modelo de personal del hotel
export const personal = connect.define("personal", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cedula:{
        type:DataTypes.STRING,
        allowNull : false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            min: 8
        }
    },
    rolID: {
        type: DataTypes.INTEGER, // Mejor que STRING
        allowNull: false
    },
    estado: {
        type: DataTypes.ENUM('Activo', 'Inactivo'),
        defaultValue: 'Activo'
    }
}, {
    freezeTableName: true // 👈 evita que lo renombre a `personals`
});
