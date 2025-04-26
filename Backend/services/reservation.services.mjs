import reservas from "../models/reservas.models.mjs";
import {
    rooms
} from "../models/habitaciones.mjs";
import detalleReserva from "../models/detalleRevservas.mjs";
import clientes from '../models/user.model.mjs'
import obtenerUserRol from "../buscarUser.mjs";
class ReservationService {
    static async createReservation({
        userID,
        data,
        arrayData
    }) {
        try {
            console.log('mi id ', userID)
            // Validar si el usuario está logueado
            if (!userID) {
                return {
                    message: "No estás logueado",
                    status: 401
                };
            }
        const userRol = obtenerUserRol()
           let esAdmin = data.rolID === 1
           let esRecepcionista = data.rolID ===3
           let esCliente = data.rolID === 2

           if(esAdmin || esRecepcionista){
              if(!data.clienteID){
                return {
                    message:"Debes proporcionar el del cliente",
                    status: 400
                }
              }
           }

             // Verificar si el cliente exite
             let cliente = await clientes.findByPk(data.clienteID)  

              if(!cliente){
                return {
                    message:"El cliente no esta en la base de datos",
                    status:404
                }
             }
            


            // Validar campos obligatorios
            for (let campo of arrayData) {
                if (!data[campo]) {
                    return {
                        message: `El campo ${campo} no puede estar vacío`,
                        status: 400
                    };
                }
            }

            // Validar fechas
            const hoy = new Date();
            const fechaInicio = new Date(data.fechaInicio);
            const fechaFin = new Date(data.fechaFin);

            if (fechaInicio < hoy) {
                return {
                    message: "La fecha de entrada no puede ser anterior a hoy",
                    status: 400
                };
            }

            if (fechaFin < fechaInicio) {
                return {
                    message: "La fecha de salida no puede ser anterior a la de entrada",
                    status: 400
                };
            }

            const arrayRooms = data.habitaciones;

            if (!arrayRooms || !Array.isArray(arrayRooms) || arrayRooms.length === 0) {
                return {
                    message: "Se debe seleccionar por lo menos una habitación",
                    status: 400
                };
            }

            // Verificar disponibilidad de habitaciones
            const habitacionesNoDisponibles = [];

            for (let room of arrayRooms) {
                const habitacion = await rooms.findOne({
                    where: {
                        id: room.idRoom
                    }
                });

                if (!habitacion || habitacion.estado !== "Disponible") {
                    habitacionesNoDisponibles.push(room.idRoom);
                }
            }

            if (habitacionesNoDisponibles.length > 0) {
                return {
                    message: `Las siguientes habitaciones no están disponibles: ${habitacionesNoDisponibles.join(", ")}`,
                    status: 400
                };
            }

            // Crear la reserva
            const nuevaReserva = await reservas.create({
                fechaInicio,
                fechaFin,
                numeroPersonas: data.numeroPersonas,
                clienteID: clienteID
            });

            // Calcular noches
            const cantidadNoches = Math.ceil((fechaFin - fechaInicio) / (1000 * 60 * 60 * 24));

            console.log(nuevaReserva.id)

            // Crear detalles y actualizar estado
            const detalles = arrayRooms.map(async (room) => {
                const habitacion = await rooms.findByPk(room.idRoom);
                if (!habitacion) return null;

                await detalleReserva.create({
                    roomID: room.idRoom,
                    reservaID: nuevaReserva.id,
                    cantidadNoches,
                    total: cantidadNoches * habitacion.precio
                });

                await habitacion.update({
                    estado: "Ocupada"
                });
            });

            await Promise.all(detalles);

            // Devolver reserva con habitaciones incluidas
            return {
                message: "Reserva exitosa",
                data: await reservas.findByPk(nuevaReserva.id, {
                    include: rooms
                }),
                status: 200
            };

        } catch (error) {
            return {
                message: "Error al procesar la reserva",
                data: null,
                error: error.message,
                status: 500
            };
        }
    }

    // sevicio para cancelar reservas
    static async cancelReservation({
        userID,
        id
    }) {
        try {

            if (!userID) {

                return {
                    message: "No hay usuario logueado",
                    status: 401

                }
            }

            //Verificar si la reserva existe para poder cancelar 
            const reservation = await reservas.findByPk(id, {

                include: {
                    model: rooms,
                    through: {
                        attributes: [] // Evita traer datos de la tabla intermedia
                    }
                }
            });
            if (!reservation) {
                return {
                    message: "Reserva no encontrada",
                    data: null,
                    status: 404
                }
            }
            if (reservation.estado == "inactive") {
                return {
                    message: "La reserva ya fue cancelada",
                    data: null,
                    status: 404
                }
            }

            // cabiar de estado
            await reservas.update({
                    estado: "inactive"
                }, // datos que se van a actualizar
                {
                    where: {
                        id
                    }
                } // condición
            );


            // Liberar las habitaciones

            if (reservation.rooms && reservation.rooms.length > 0) {
                // extraer los id de cada habitacion asociada a la reserva
                const roomIds = reservation.rooms.map(h => h.id)
                console.log("HABITACIONES A CAMBIAR DE ESTADO  ", roomIds)

                await rooms.update({
                    estado: "Disponible"
                }, {
                    where: {
                        id: roomIds
                    }
                });

            }

            return {
                message: "Reserva cancelada",
                data: null,
                status: 200
            }


        } catch (error) {
            return {
                message: " Error al cancelar la reserva",
                data: null,
                error: error.message,
                status: 500
            }
        }
    }

    // servicio para obtener reservas por usuario

    static async getAllReservations(iduser) {
        try {

            if (!iduser) {
                return {
                    message: "Usuario no autenticado",
                    status: 401
                }
            }
            const allReservations = await reservas.findAll( {
                where:{
                    clienteID:iduser
                },
                include: [{
                    model: rooms,
                    attributes: ["piso", "numeroHabitacion"],
                    through:{
                        attributes:["cantidadNoches","total"]
                    }
                }]

            })

            if (!allReservations) {
                return {
                    message: "No se econtraron habitaciones reservadas a su nombre",
                    status: 404
                }
            }

            return {
                message:"Habitaciones reservadas a su nombre",
                data:allReservations,
                status:200
            }

        } catch (error) {
            return {
                message:"Error al obtener las habitaciones reservadas",
                status:500
            }

        }
    }
}

export default ReservationService;