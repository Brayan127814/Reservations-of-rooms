import BaseUserService from "../services/BaseUserService.service.mjs";
import {
    personal
} from "../models/personal.models.mjs";

class PersonalController {
    static async registerPersonal(req, res) {

        try {

            const data = req.body

            const result = await BaseUserService.registerUser({
                model: personal,
                data: data,
                arrayData: ["nombre", "apellido", "cedula","email", "password", "rolID"]
            })

            return res.status(result.status).json({
                message: result.message,
                data: result.data || null,
                error: result.error || null
            })


        } catch (error) {
            return res.status(500).json({
                message: "Error al registrar el personal",
                data: null,
                error: error.message
            })
        }

    }

    //Metodo para obtener los usuarios registrados

    static async getAllPersonal(req, res) {
        try {

            const iduser = req.user.id
            const response = await BaseUserService.getAllUser({
                Model: personal,
                requestingUserId: iduser
            })

            return res.status(response.status).json({
                message: response.message,
                data: response.data || null,
                error: response.error || null
            })

        } catch (error) {
            return res.status(500).json({
                message: "Error al obtener los usuarios",
                data: null,
                error: error.message
            })
        }
    }

    //Controlador par actualizar datos de personal del hotel
    static async updatePersonal(req, res) {
        try {
            const iduser = req.user.id
            const idUpdate = req.params.id
            const data = req.body
            const response = await BaseUserService.updateUser({
                iduser,
                modelo: personal,
                data: data,
                arrayData: ["rolID", "estado"]

            })


            
        } catch (error) {
            return {
                message: "Error al actualizar los datos",
                status: 500,
                error
            }
        }
    }
}

export default PersonalController