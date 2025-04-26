import PersonalController from "../controllers/personal.controller.mjs";
import { validarToken } from "../middelWare/validartToken.mjs";
import LoginController from "../controllers/login.controller.mjs";
import validatorRol from "../middelWare/validarRol.mjs";
import { Router } from "express";
const routesPerson = Router()

routesPerson.post("/register",PersonalController.registerPersonal)
routesPerson.post("/login",LoginController.loginPersonal)
routesPerson.get("/getPersonal",validarToken,validatorRol(["admin"]),PersonalController.getAllPersonal)

export default routesPerson
