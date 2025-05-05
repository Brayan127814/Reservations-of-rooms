import { where } from "sequelize"
import {
    rooms
} from "../models/habitaciones.mjs"

class ServiceRooms {
    //Servicio registro de habitaciones

    static async createRoom({
        idUser,
        data,
        arrayData
    }) {
        try {

            //validar que el usuario este  logueado
            if (!idUser) {
                return {
                    message: "El usuario no esta logueado",
                    status: 401
                }
            }
            //Validar que los campos no esten vacios
            for (const field of arrayData) {
                if (!data[field]) {
                    return {
                        message: `El campo ${field} es requerido`
                    }
                }
            }

            //Validar que piso y numero de habitacion sean numericos
            if (isNaN(data.piso) || isNaN(data.numeroHabitacion)) {
                return {
                    message: `El piso y numero de habitacion deben ser numericos`,
                    status: 400
                }
            }


            //Establecer limite de habitaciones por piso
            const limitRoom = 6
            //Establecer formato de numero de habitacioens
            const formatRooms = parseInt(`${data.piso}01`)
            //Establecer limier de numero de habitaciones por piso
            const maxRoomNumber = formatRooms + limitRoom - 1

            console.log('Formato de habitaciones  ', formatRooms)
            console.log("Maximo numero de habitaciones  ", maxRoomNumber)

            //Validar que el numero de habitacion este dentro del rango permitido
            if (data.numeroHabitacion < formatRooms || data.numeroHabitacion > maxRoomNumber) {
                return {
                    message: `El numero de habitacion debe estar entre ${formatRooms} y ${maxRoomNumber}`
                }
            }

            //Verificar si la habitacion ya existe
            const existinRoom = await rooms.findOne({
                where: {
                    piso: data.piso,
                    numeroHabitacion: data.numeroHabitacion
                }
            })

            if (existinRoom) {
                return {
                    message: "La habitacion ya existe",
                    status: 400
                }
            }


            //Validar la cantidad de habitaciones registradas en el piso
            const roomCount = await rooms.count({
                where: {
                    piso: data.piso
                }
            })

            if (roomCount >= maxRoomNumber) {
                return {
                    message: `Limite de habitaciones en el piso ${data.piso} alcanzado`,
                    status: 400

                }
            }

            data.estado = data.estado || "Disponible"

            const newRoom = await rooms.create(data)

            return {
                message: "Habitacion creada correctamente",
                status: 201,
                data: newRoom
            }
        } catch (error) {
            return {
                message: error.message,
                status: 500,
                error
            }

        }
    }

    //Filtrar las habitaciones por estado

    static async getRoomsByStatus(idUser, estado) {
        try {

            //validar que el usuario este  logueado
            if (!idUser) {
                return {
                    message: "El usuario no esta logueado",
                    status: 401
                }
            }
            const normalizedEstado = estado.charAt(0).toUpperCase() + estado.slice(1).toLowerCase();
            const statusVal = ["Ocupada", "Disponible"]

            if (!statusVal.includes(normalizedEstado)) {
                return {
                    message: "Estado invalido",
                    status: 400
                }
            }

            //Obetner las habitaciones

            const room = await rooms.findAll({
                where: {
                    estado: normalizedEstado
                }
            })


            if (room.length === 0) {
                return {
                    message: 'No se encontraron habitaciones con este estado',
                    status: 404
                }
            }

            return {
                message: "Habitaciones encontradas",
                data: room,
                status: 200

            }

        } catch (error) {
            return {
                message: "Error al obtener las habitaciones",
                status: 500,
                error
            }

        }
    }

    //Actualizar precio y estado de habitaciones,
    static async updateByRoom({
        idUser,
        idRoom,
        data,
        arrayData
    }) {

        //validar que el usuario este  logueado
        if (!idUser) {
            return {
                message: "El usuario no esta logueado",
                status: 401
            }
        }

        try { //Verificar que la habitacon si estè en la BD
            const room = await rooms.findOne({
                where: {
                    id: idRoom
                }

            })
            console.log(room)
            if (!room) {
                return {
                    message: 'Not found',
                    status: 404
                }

            }
            for (const val of arrayData) {
                if (!data[val]) { // validar  que no vengan campos vacios
                    return {
                        message: 'Faltan datos',
                        status: 404
                    }
                }
            }


            const {
                precio,
                estado
            } = data

            if (precio <= 0) {
                return {
                    message: 'El precio debe ser mayor a 0',
                    status: 404
                }
            }



            await room.update({
                precio,
                estado,

            })

            return {
                message: "Habitacion actualizada",
                status: 200
            }

        } catch (error) {

            return {
                message: "Error al actualizar la habitacion",
                status: 500,
                error: error.message
            }

        }

    }
    // Servicio para obtener todas las habitaciones disponibles
    static async getAllRoom(estado) {
        try {
            const room = await rooms.findAll({
                where: { estado }
            });

            // Comprobamos si no hay habitaciones
            if (room.length === 0) {
                return {
                    message: 'No hay habitaciones para mostrar',
                    status: 404
                };
            }

            return {
                data: room,
                status: 200
            };
        } catch (error) {
            // Manejo de errores
            console.error(error);
            return {
                message: 'Ocurrió un error al obtener las habitaciones',
                status: 500
            };
        }
    }
    // consultr habitaciones por id
    static async getRoomByID(idroom,) {
        try {
            const room = await rooms.findOne({
                where: { id: idroom }
            })

            if (!room) {
                return {
                    message: 'No se encotro habitacion',
                    status: 404
                }
            }

            return {
                
                data: room,
                status: 200
            }
        } catch (error) {
                 // Manejo de errores
            console.error(error);
            return {
                message: 'Ocurrió un error al obtener las habitaciones',
                status: 500
            }
        }
    }
}

export default ServiceRooms