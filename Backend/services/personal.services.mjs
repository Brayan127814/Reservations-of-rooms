import personal from '../models/personal.models.mjs'
import bcrypt from 'bcrypt'

class PersonalService {
    static async registerPersonal ({nombre,apellido,email,password,rolID}){
        try{
            

        }catch(error){
            return {
                error: true,
                message: error.message
            }
        }

    }
}