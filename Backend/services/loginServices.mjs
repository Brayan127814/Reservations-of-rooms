import cliente from '../models/user.model.mjs'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


class LoginService {
    static async loginAuth({modelo,email,password}) {
        try {

            if(!email || !password){
                return {
                    message: 'Todos los campos son obligatorios'
                }
            }

            //Obtener usuario

            const user = await modelo.findOne({
                where: {
                    email
                }
            })
            console.log(user)
            if (!user) {
                return {
                    message: 'Usuario no encontrado'
                }
            }


            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return {
                    message: 'Contraseña incorrecta'
                }
            }

            //Generar token

            const token = jwt.sign({
                id: user.id
            }, process.env.keySecret, {
                expiresIn: '1h'
            })

            return {
                message: 'Inicio de sesion exitoso',
                sucess: true,
                token
            }
        } catch (error) {
            return {
                message: 'Error al iniciar sesion',
                error:error
            }
        }
    }
}


export default LoginService