//Middelware para validar el rol

const validatorRol = (allowedRoles) => {
    return (req, res, next) => {

        if (!req.user) {
            return res.status(401).json({
                msg: 'No hay token en la peticion'
            })
        }

        if (!allowedRoles.includes(req.user.roleName)) {
            return res.status(403).json({
                msg: 'No tiene permisos para hacer esta accion'
            })
        }

        next()
    }
}


export default validatorRol