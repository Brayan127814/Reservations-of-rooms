import bcrypt from 'bcrypt'
import cliente from '../models/user.model.mjs'


class AuthServices {
    static async registerUser({
        name,
        lastName,
        email,
        telefono,
        password
    }) {
        try {

            if (!name || !lastName || !email || !telefono || !password) {

                return {
                    message: 'Todos los campos son obligatorios',
                    status: 400
                }
            }
            let hasPassword = await bcrypt.hash(password, 10)
            const user = await cliente.create({
                name,
                lastName,
                email,
                telefono,
                password: hasPassword
                
            })

            return {
                message: 'Usuario creado correctamente',
                status: 200,
                data:user
            }
        } catch (error) {

            return {
                message: 'Error al crear el usuario',
                status: 500,
                error

            }

        }
    }

    //obtener todos los usuarios segun su rol

    static async getAllClient(personalID) {
        try {

            if(!personalID){
                return {
                    message: 'No hay token',
                    status: 400
                }
            }

            const client = await cliente.findAll()

            if (!client.length) {
                return {
                    message: 'No hay usuarios registrados',
                    status: 400,
                    data: []
                }
            }

            return {
                message: 'Usuarios encontrados',
                status: 200,
                data: client
            }
        } catch (error) {

            return {
                message: 'Error al obtener los usuarios',
                status: 500,
                error
            }

        }



    }
    //Actualizar datos de clientes
    static async updateUser(id, data) {
        try {

            if(!id){
                return {
                    message: 'No hay token',
                    status: 400
                }
            }

            const user = await cliente.findByPk(id)
            if (!user) {
                return {
                    message: 'Usuario no encontrado',
                    status: 400
                }
            }


            await cliente.update(data, {
                where: {
                    id
                }
            })

            return {
                message:"Usuario actualizado",
                status: 200
    
            }


        } catch (error) {
            return {
                message: 'Error al actualizar el usuario',
                status: 500,
                error
            }
        }
    }

    //Eliminar un cliente

    static async deleteUser(id) {

        try {

            const user = await cliente.findByPk(id)
            if (!user) {
                return {
                    message: "Usuario no encontrado",
                    status: 400
                }
            }

            await cliente.destroy({
                where: {
                    id
                }
            })
            return {
                message: "Usuario eliminado",
                status: 200
            }

        } catch (error) {
            return {
                menssaje: "Error al eliminar usuario",
                status: 500,
                error
            }
        }
    }
}

export default AuthServices