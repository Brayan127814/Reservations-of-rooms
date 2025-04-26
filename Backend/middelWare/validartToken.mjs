import cliente from "../models/user.model.mjs";
import {
    personal
} from "../models/personal.models.mjs";
import roles from "../models/roles.mjs";
import jwt from 'jsonwebtoken'

//Middelware para validar el  token
export const validarToken = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];

        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                message: "No se ha enviado el token"
            })
        }

        //Verificar token

        jwt.verify(token, process.env.keySecret, async (err, user) => {
            if (err) {
                return res.status(401).json({
                    message: "token no valido"
                })
            }

            //extraer el rol 
            try {
                const rol = await personal.findOne({
                    where: {
                        id: user.id
                    },
                    include: {
                        model: roles,
                        attributes: ["roleName"]
                    },
                    attributes: ["nombre", "rolID"]
                })
                if (!rol) {
                    return res.status(401).json({
                        message: "No se ha encontrado el rol del usuario"
                    })
                }

                //Extraer el rol

                const role = rol.role ? rol.role.roleName : null
                console.log("Usuario y su rol "+role)
                console.log("Usuario encontrado:", JSON.stringify(rol, null, 2));

                req.user = {
                    id: user.id,
                    nombre: rol.nombre,
                    rolID: rol.rolID,
                    roleName: role
                }
                console.log(req.user.roleName)

                next()


            } catch (error) {
                return res.status(500).json({
                    message: "Error en la validación del token",
                    error: error.message
                })

            }



        })

    } catch (error) {
        return res.status(500).json({
            message: "Error en la validación del token",
            error: error.message
        })
    }
}