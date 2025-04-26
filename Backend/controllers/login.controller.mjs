import LoginService from "../services/loginServices.mjs";
import cliente from "../models/user.model.mjs";
import { personal } from "../models/personal.models.mjs";




class LoginController {
    static async loginPersonal(req, res) {
        const {email,password} = req.body;

        const response = await LoginService.loginAuth(
            {
                modelo:personal,
                email:email,
                password:password
            }
        )

       
        return res.status(response.sucess ? 200 : 400).json({
            message: response.message,
            token: response.token || null,
            error: response.error || null
        })
    }

   static async loginCliente(req, res) {

        try{

            const {email, password} = req.body

            const response = await LoginService.loginAuth({
                modelo:cliente,
                email:email,
                password:password
            })

            return res.status(response.sucess ? 200 : 400).json({
                message: response.message,
                token: response.token || null,
                error: response.error || null
            })

        }catch(error){
            return res.status(400).json({
                message: "Error al iniciar sesion",
                error: error.message
            })
        }
       
   }


}

export default LoginController