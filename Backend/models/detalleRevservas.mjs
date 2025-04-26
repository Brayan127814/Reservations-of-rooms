import connect from '../config/db.mjs'
import {
    DataTypes
} from 'sequelize'
const detalleReserva = connect.define("detallerReserva", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    roomID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    reservaID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cantidadNoches: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    total: {
        type: DataTypes.INTEGER,
        allowNull: false
    }


})

export default detalleReserva