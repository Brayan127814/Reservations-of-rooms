import ReservationService from "../services/reservation.services.mjs";
import cliente from "../models/user.model.mjs";
import BaseUserService from "../services/BaseUserService.service.mjs";
import ReservationByAdmin from "../services/createReservationByAdmin.mjs";

class ReservationController {
    static async registerReservation(req, res) {
        try {
            const data = req.body;
            const userID = req.user.id;
            const reservation = await ReservationService.createReservation({
                userID,
                data,
                arrayData: ["fechaInicio", "fechaFin", "numeroPersonas", "habitaciones"]
            });





            return res.status(reservation.status).json(
                {
                    message: reservation.message,
                    data: reservation.data || null,
                    error: reservation.error || null
                }
            );
        } catch (error) {
            res.status(500).json({
                message: "este es mi error",
                error: error.message
            });
        }
    }

    //Controlador para crear reservas por parte del personal

    static async ReservationByAdmin(req, res) {
        try {
            const userID = req.user.id;
            const { cedula, ...data } = req.body; // OJO aquí, desestructuramos
            const response = await ReservationByAdmin.createReservationByAdmin(
                userID,
                data,
                cedula,
                ["fechaInicio", "fechaFin", "numeroPersonas", "habitaciones"]
            );

            return res.status(response.status).json({
                message: response.message,
                data: response.data || null,
                error: response.error || null
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error presentado',
                error: error.message
            });
        }
    }




    static async cancelReservationS(req, res) {
        try {

            const userID = req.user.id
            const id = req.params.id

            const reservation = await ReservationService.cancelReservation({
                userID,
                id
            })
            return res.status(reservation.status).json(
                {
                    message: reservation.message,
                    data: reservation.data || null,
                    error: reservation.error || null
                }
            )
        } catch (error) {
            res.status(500).json({
                error: error.message
            })
        }
    }

    // controlador para obtener todas las reservas asociada un cliente
    static async allReservations(req, res) {
        try {
            const userid = req.user.id
            const reservation = await ReservationService.getAllReservations(userid)

            return res.status(reservation.status).json({
                message: reservation.message,
                data: reservation.data || [],
                status: reservation.status
            })

        } catch (error) {

            res.status(500).json({
                error: error.message
            })

        }
    }

}

export default ReservationController;