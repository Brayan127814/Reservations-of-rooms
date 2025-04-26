import clientes from '../models/user.models.mjs'
import roles from '../models/roles.mjs'


export const obtenerUserRol = async (userID) => {
    try {
        const usuario = await clientes.findOne({
            where: { id: userID },
            include: {
                model: roles,
                as: 'role' // Solo si tienes un alias definido en la asociación
            }
        });

        return usuario;
    } catch (error) {
        console.error("Error al obtener usuario:", error.message);
        return null;
    }
}
export default obtenerUserRol;