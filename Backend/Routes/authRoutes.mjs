import { Router } from "express";
import AuthController from "../controllers/auth.controller.mjs";
import LoginController from "../controllers/login.controller.mjs";
import { validarToken } from "../middelWare/validartToken.mjs";

const authRoute = Router();

authRoute.post("/register", AuthController.register);
authRoute.post("/login", LoginController.loginCliente);
authRoute.put("/update",validarToken,AuthController.updateClient)
authRoute.delete('/delete/:id',validarToken,AuthController.deleteClient)
authRoute.get("/getAll",validarToken,AuthController.getAllClients)

export default authRoute;