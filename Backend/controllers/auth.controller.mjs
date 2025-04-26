import AuthServices from "../services/auth.services.mjs"
import BaseUserService from "../services/BaseUserService.service.mjs"
import cliente from "../models/user.model.mjs"

class AuthController {

    static async register(req, res) {
        const data = req.body
        const response = await BaseUserService.registerUser({
            model: cliente,
            data: data,
            arrayData: ["name", "lastName", "cedula","email","telefono","password"]
        })

        return res.status(response.status).json({
            message: response.message,
            data: response.data || null,
            error: response.error || null

        })
    }

    //Controlador para actualizar registros

    static async updateClient(req, res) {
        const id = req.user.id
        const data = req.body

        const response = await BaseUserService.updateUser({
            userID: id,
            modelo: cliente,
            data: data,
            arrayData: ["name", "lastName", "email", "telefono"]
        })

        return res.status(response.status).json({
            message: response.message,
            status: response.status,
            error: response.error || null

        })
    }
    // controlador para eliminar un registro

    static async deleteClient(req, res) {

        try {
            const requesterID = req.user.id
            const deleteID = req.params.id
            const response = await BaseUserService.deleteUser({
                modelo:cliente,
                requesterID: requesterID,
                deleteID: deleteID
            })

            return res.status(response.status).json({
                message: response.message,
                data: response.data || null,
                error: response.error || null
            })



        } catch (error) {
            return res.status(500).json({
                message: "Error al eliminar el registro",
                error: error.message
            })
        }

    }

    // controlador para obtener todos los registros

    static async getAllClients(req, res) {
        try {
            const requestingUserId = req.user.id
            const response = await BaseUserService.getAllUser({
                Model: cliente,
                requestingUserId: requestingUserId
            })

            return res.status(response.status).json({
                message: response.message,
                data: response.data || null,
                error: response.error || null
            })

        } catch (error) {
            return res.status(500).json({
                message: "Error al obtener los registros",
                error: error.message
            })
        }


    }
}
export default AuthController