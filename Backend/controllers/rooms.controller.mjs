import ServiceRooms from "../services/habitaciones.services.mjs";



//Controlador para registrar una habitacionç
class RoomController {
    static async registerRoom(req, res) {
        try {

            const idUser = req.user.id
            const data = req.body;
            const response = await ServiceRooms.createRoom({
                idUser,
                data: data,
                arrayData: ["tipo", "piso", "numeroHabitacion", "descripcion", "capacidad", "precio", "imageUrl"]

            });

            return res.status(response.status).json({
                message: response.message,
                data: response.data || null,
                error: response.error || null
            })

        } catch (error) {
            return res.status(500).json({
                message: "Error al registrar la habitacion",
                data: null,
                error: error.message
            })

        }
    }

    //Obtener habitaciones por estado
    static async RoomsByStatus(req, res) {
        try {
            const userID = req.user.id
            const estado = req.params.estado
            const response = await ServiceRooms.getRoomsByStatus(userID, estado)

            return res.status(response.status).json({
                message: response.message,
                data: response.data || null,
                error: response.error || null
            })

        } catch (error) {
            return res.status(500).json({
                message: "Error al obtener las habitaciones",
                data: null,
                error: error.message
            })

        }
    }

    //Actualizar precio y estado de habitaciones

    static async updateRoom(req, res) {
        try {

            const userID = req.user.id
            const idRoom = req.params.id
            const data = req.body
            const response = await ServiceRooms.updateByRoom({
                userID,
                idRoom,
                data,
                arrayData: ["precio", "estado"]

            })

            return res.status(response.status).json({
                message: response.message,
                status: response.status || null,
                error: response.error || null
            })

        } catch (error) {

            return res.status(500).json({
                message: "Error al actualizar la habitación",
                data: null,
                error: error.message
            })
        }
    }

    // controlador para obtener las habitaciones

    static async obtenerhatitaciones(req, res) {
        try {
            const estado = "Disponible"

            const response = await ServiceRooms.getAllRoom(estado)

            return res.status(200).json({
                data: response.data || null,
                status: response.status || 200,
                error: null
            });

        } catch (error) {

            return res.status(500).json({ message: 'Error interno del servidor' })

        }
    }

    static async roomByID(req, res) {
        try {
            const idroom = req.params.id
            const response = await ServiceRooms.getRoomByID(idroom)

            return res.status(response.status).json({
                message: response.message,
                data: response.data || null,
                error: response.error || null
            })
        } catch (error) {
            return res.status(500).json({ message: 'Error interno del servidor' })
        }
    }
}


export default RoomController;