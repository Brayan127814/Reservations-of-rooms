import cliente from "../models/user.model.mjs";
import roles from "../models/roles.mjs";
import jwt from 'jsonwebtoken'


const tokenClient = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    //extraer token
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            message: 'No hay token'
        })
    }


    jwt.verify(token, process.env.keySecret, async (err, user) => {
        if (err) {
            res.status(403).json({
                message: 'Token invalido'
            })
        }

        //Extraer el rol que por defecto es cliente para el tema de permisos
        try {
            const rolUser = await cliente.findOne({
                where: {
                    id: user.id
                },
                include: {
                    model: roles,
                    attributes: ["roleName"]
                },
                attributes:["name","rolID"]
            })

            if(!rolUser){
                return res.status(401).json({
                    message: 'No hay rol'
                })
            }

            const nameRol = rolUser.role ? rolUser.role.roleName : null

            console.log('Rol encontrado  ', nameRol)

            req.user ={
                id:user.id,
                name:rolUser.name,
                rolID:rolUser.rolID,
                roleName:nameRol
            }

            next()

        } catch (error) {

            return res.status(401).json({
                message: 'Error en la validacion del token',
                error:error.message
            })
        }
    })


}

export default tokenClient