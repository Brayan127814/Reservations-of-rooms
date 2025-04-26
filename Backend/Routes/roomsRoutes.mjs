import {
    Router
} from "express";
import RoomController from "../controllers/rooms.controller.mjs";
import validatorRol from "../middelWare/validarRol.mjs";
import {
    validarToken
} from "../middelWare/validartToken.mjs";

const roomRoutes = Router()

// roomRoutes.post("/register", RoomController.registerRoom)    

roomRoutes.post("/register", validarToken, validatorRol(["admin"]), RoomController.registerRoom)
roomRoutes.get('/status/:estado', validarToken, validatorRol(["admin", "recepcionista", "cliente"]), RoomController.RoomsByStatus)
roomRoutes.put('/update/:id', validarToken, validatorRol(["admin"]), RoomController.updateRoom)
export default roomRoutes



