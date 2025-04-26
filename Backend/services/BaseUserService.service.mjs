import bcrypt from 'bcrypt'

class BaseUserService {
    static async registerUser({
        model,
        data,
        arrayData
    }) {

        try {
            //Validar todos los campos 
            console.log("Modelo en el que se esta trabajando", model)
          

            for (const field of arrayData) {
                if (!data[field]) {
                    return {
                        message: `El campo ${field} es obligatorio`,
                        status: 400

                    }
                }
            }

            //Encriptar contraseña
            data.password = await bcrypt.hash(data.password, 10)

            //Crear el usuario (personal o cliente)
            const user = await model.create(data)

            return {
                message: `usuario se ha creado correctamente`,
                status: 201,
                data: user
            }



        } catch (error) {
            return {
                message: 'Error al crear el usuario',
                status: 500,
                error
            }
        }

    }

    // BUSCAR CLIENTES POR CEDULA 
    static async findClientByDocument ({requesID,model, document}) {

        try{ 

            //verificar que la pesona este logueada en el sistema del hotel
            if(!requesID){
                return{
                    message: 'No se ha encontrado el usuario',
                    status: 404
                }
            }

            //buscar el cliente en la base de datos
            // si no esta se debe registrar
            const client = await model.findOne({where: {document}})

            if(!client){
                return {
                    message:"Persona no se encuentra en la base de datos",
                    status:404
                }
            }

         return {
                message: 'Cliente encontrado',
                status: 200,
                data: client
         }
                
        }catch(error){
            return {
                message: 'Error al buscar el cliente',
                status: 500,
                error
            }
        }

    }

    //obtener usuarios ya sea clientes o personal del hotel

    static async getAllUser({
        Model,
        requestingUserId
    }) {
        try {
            //Validamos que el usario este logueado para realizar esta accion
            if (!requestingUserId) {

                return {
                    message: 'No tienes permisos para realizar esta accion',
                    status: 401
                }
            }

            const users = await Model.findAll()

            if (users.length === 0) {
                return {
                    message: "No hay usuarios Registrados",
                    status: 404,
                    data: []
                }
            }

            return {
                message: 'Usuarios encontrados',
                data: users,
                status: 201
            }
        } catch (error) {

            return {
                message: 'Error al obtener los usuarios',
                status: 500,
                error
            }

        }

    }
    //Metodo para actualizar los registros de los usuarios en la base de datos

    static async updateUser({
        userID,
        modelo,
        data,
        arrayData
    }) {
        try {

            if (!userID) {
                return {
                    message: "No hay usuario logueado"
                }

            }


            //Validar los campos
            for (const field of arrayData) {
                if (!data[field]) {
                    return {
                        message: `El campo ${field} es obligatorio`,
                        status: 400
                    }
                }
            }

            //Actualizar los datos del usuario
            await modelo.update(data, {
                where: {
                    id: userID
                }
            })

            return {

                message: "Datos actualizados",
                status: 200

            }
        } catch (error) {
            return {
                message: 'Error al actualizar los usuarios',
                status: 500,
                error
            }
        }
    }


    //Eliminar Registro de un usuario cliente o personal del hotel

    static async deleteUser({
        modelo,
        requesterID,
        deleteID
    }) {

        try {
            if (!requesterID) {
                return {
                    message: "No hay usuario logueado",
                    status: 404

                }
            }
            const user = await modelo.findOne({
                where: {
                    id: deleteID
                }
            })

            if (!user) {
                return {
                    message: "No se encontro el usuario",
                    status: 404,
                    data:user
                }
            }

            //Eliminar registro

            await modelo.destroy({
                where: {
                    id: deleteID
                }
            })

            return {
                message: 'Registro Eliminado',
                status: 200
            }


        } catch (error) {
            return {
                message: error.message,
                status: 500
            }
        }
    }
}

export default BaseUserService