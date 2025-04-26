import ReservationService from "../services/reservation.services.mjs";
import cliente from "../models/user.model.mjs";
import BaseUserService from "../services/BaseUserService.service.mjs";


class ReservationController {
    static async registerReservation(req, res) {
        try {
            const data = req.body;
            const userID = req.user.id;
            const reservation = await ReservationService.createReservation({
                userID,
                data,
                arrayData: ["fechaInicio", "fechaFin", "habitaciones"]
            });


            


            return res.status(reservation.status).json(
             {
                message: reservation.message,
                data:reservation.data || null,
                error: reservation.error || null
             }
            );
        } catch (error) {
            res.status(500).json({
                message: "este es mi error",
                error:error.message
            });
        }
    }


    static async cancelReservationS(req, res) {
        try {
            
            const userID=req.user.id
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
        }catch(error){
              res.status(500).json({
                error:error.message
              })
    }
}

// controlador para obtener todas las reservas asociada un cliente
static async allReservations (req, res){
    try{
       const userid=req.user.id
       const reservation = await ReservationService.getAllReservations(userid)

       return res.status(reservation.status).json({
        message:reservation.message,
        data:reservation.data || [],
        status: reservation.status
       })

    }catch(error){

        res.status(500).json({
            error:error.message
        })

    }
}

}

export default ReservationController;