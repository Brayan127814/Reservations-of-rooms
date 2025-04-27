import Cliente from "../models/user.model.mjs";

 const buscarCliente = async (cedula) => {
    try {
        const cliente = await Cliente.findOne({
            where: { cedula }  // <--- Corrección importante
        });

        if (!cliente) {
            return {
                success: false,
                message: "Cliente no encontrado"
            };
        }

        return {
            success: true,
            data: cliente
        };

    } catch (error) {
        return {
            success: false,
            message: error.message
        };
    }
};


export default buscarCliente