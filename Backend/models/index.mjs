import cliente from "./user.model.mjs"
import {
    personal
} from "./personal.models.mjs"
import roles from "./roles.mjs"
import reservas from './reservas.models.mjs'
import detalleReserva from "./detalleRevservas.mjs"
import {
    rooms
} from "./habitaciones.mjs"

// Un rol tiene muchos personal
roles.hasMany(personal, {
    foreignKey: "rolID"
})

// Cada personal pertenece a un rol
personal.belongsTo(roles, {
    foreignKey: "rolID"
})

// un cliente puede tener muchas reservas
cliente.hasMany(reservas, {
    forignKey: "clienteID"
})
//Una reserva  pertenece a un cliente
reservas.belongsTo(cliente, {
    forignKey: "clienteID"
})

rooms.belongsToMany(reservas, {
    through: detalleReserva,
    foreignKey: "roomID"
})

reservas.belongsToMany(rooms, {
    through: detalleReserva,
    foreignKey: "reservaID"
})

roles.hasMany(cliente, {
 foreignKey:"rolID"   
}
)
cliente.belongsTo(roles,{
    foreignKey:"rolID"
})