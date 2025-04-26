import dotenv from "dotenv"
import {
    Sequelize
} from "sequelize"


dotenv.config()
console.log(process.env.BD_NAME)
console.log(process.env.BD_USER)
console.log(process.env.BD_PASSWORD)
console.log(process.env.BD_HOST)

const connect = new Sequelize(

    process.env.BD_NAME,
    process.env.BD_USER,
    process.env.BD_PASSWORD, {
        dialect: "mysql",
        host: process.env.BD_HOST
    }
)

// validar conexion
const validateConnection = async () => {
    try {
        await connect.authenticate()
        console.log("conexion exitosa")
    } catch (error) {
        console.log("error de conexion", error)

    }
}


validateConnection()
export default connect

