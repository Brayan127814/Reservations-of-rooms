import ReservationController from "../controllers/reservation.controller.mjs";
import validatorRol from "../middelWare/validarRol.mjs";
import tokenClient from "../middelWare/validarTokenCliente.mjs";

import { validarToken } from "../middelWare/validartToken.mjs";
import { Router } from "express";

const reservationsRoutes = Router();

reservationsRoutes.post('/create',tokenClient,validatorRol(["cliente"]),ReservationController.registerReservation)
reservationsRoutes.post('/create-reservations',validarToken,validatorRol(["admin","recepcionista"]),ReservationController.registerReservation)
reservationsRoutes.post('/reservatiosAdmins',validarToken,validatorRol(["admin","recepcionista"]),ReservationController.ReservationByAdmin)
reservationsRoutes.get('/getAllReservations',tokenClient,validatorRol(["cliente"]),ReservationController.allReservations)
reservationsRoutes.put('/cancel/:id',validarToken,validatorRol(["admin","recepcionista","cliente"]),ReservationController.cancelReservationS)



export default reservationsRoutes;