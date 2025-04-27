import detalleReserva from "../models/detalleRevservas.mjs";
import { rooms } from "../models/habitaciones.mjs";
import reservas from "../models/reservas.models.mjs";
import cliente from "../models/user.model.mjs";
import buscarCliente from "../utils/buscarCliente.mjs";

class ReservationByAdmin {

    static async createReservationByAdmin(userID, data, cedula, arrayData) {
        try {
            // El admin o recepcionista debe estar logueado en el sistema
            if (!userID) {
                return {
                    message: "No hay usuario logueado",
                    status: 404
                };
            }

            // Buscar el cliente en la base de datos
            const cliente = await buscarCliente(cedula);
            console.log(cliente)
            if (!cliente) {
                return {
                    message: "Se debe registrar el cliente antes de continuar",
                    status: 404
                };
            }

            // El cliente existe, proceder con la reserva
            const clienteID = cliente.data.id; // ID del cliente para usar en la reserva
    console.log("cliente encontrado  " , clienteID)
            // Aquí seguirías con la validación de campos y creación de la reserva como en tu servicio normal
            // pero usando clienteID en vez de userID

            //Validar que no hayan campos vacios
            for (let campo of arrayData) {
                if (!data[campo]) {
                    return {
                        message: `El campo ${campo} no puede estár vacío`,
                        status: 400
                    }
                }
            }

            //Validar fachas
            const hoy = new Date()
            const fechaInicio = new Date(data.fechaInicio)
            const fechaFin = new Date(data.fechaFin)

            if (fechaInicio < hoy) {

                return {
                    message: "La fecha no puede ser anterior a hoy",
                    status: 400
                }
            }

            if (fechaFin < fechaInicio) {
                return {
                    message: "La fecha de salida no puede ser anterior a la de entrada",
                    status: 400
                }
            }

            //array de habitaciones
            const arrayRooms = data.habitaciones

            if (!arrayRooms || !Array.isArray(arrayRooms) || arrayRooms.length === 0) {

                return {
                    message: "Debes escoger almenos una habitacion",
                    status: 400
                }
            }

            const habitacionesNoDisponibles = []

            for (let room of arrayRooms) {

                const habitacion = await rooms.findOne(
                    {
                        where: { id: room.idRoom }
                    }
                )

                if (habitacion.estado !== "Disponible" || !habitacion) {

                    habitacionesNoDisponibles.push(room.idRoom)
                }


            }

            if (habitacionesNoDisponibles.length > 0) {
                return {
                    message: `Las habitaciones ${habitacionesNoDisponibles.join(", ")}`,
                    status: 400
                }
            }

            //crear la nueva reserva


            const newReservation = await reservas.create({
                fechaInicio,
                fechaFin,
                numeroPersonas: data.numeroPersonas,
                clienteID:clienteID
            }
            )

            const cantidadNoches = Math.ceil((fechaFin - fechaInicio) / (1000 * 60 * 60 * 24));
            const detalles = arrayRooms.map(async (room) => {
                const habitacion = await rooms.findByPk(room.idRoom)
                if (!habitacion) return null

                await detalleReserva.create({
                    roomID: room.idRoom,
                    reservaID: newReservation.id,
                    cantidadNoches,
                    total: cantidadNoches * habitacion.precio
                })

                // cambiar estado de la habitacion
                await habitacion.update(
                    {
                        estado: "Ocupada"
                    }
                )
            })

            await Promise.all(detalles)

            return {

                message: "Reserva exitosa",
                data: await reservas.findByPk(newReservation.id, {
                    include: rooms
                }),
                status: 200

            }
        } catch (error) {
            return {
                message: "Error al crear la reserva",
                error: error.message,
                status: 500
            };
        }
    }

}

export default ReservationByAdmin