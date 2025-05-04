import express from 'express'
import connect from "./Backend/config/db.mjs"
import Rol from './Backend/models/roles.mjs'
import cliente from "./Backend/models/user.model.mjs"
import {
    personal
} from './Backend/models/personal.models.mjs'
import {
    rooms
} from './Backend/models/habitaciones.mjs'
import reservas from './Backend/models/reservas.models.mjs'
import detalleReserva from './Backend/models/detalleRevservas.mjs'
import authRoute from './Backend/Routes/authRoutes.mjs'
import routesPerson from './Backend/Routes/personalRoutes.mjs'
import roomRoutes from './Backend/Routes/roomsRoutes.mjs'
import reservationsRoutes from './Backend/Routes/reservarionRoutes.mjs'
import cors from 'cors'

import "./Backend/models/index.mjs"


const app = express()
const PORT = process.env.PORT || 5000
app.use(express.json())
app.use(cors())
app.use('/auth', authRoute)
app.use('/personal', routesPerson)
app.use('/rooms', roomRoutes)
app.use('/reservations', reservationsRoutes)
const init = async () => {

    try {
        await connect.sync({
            force: false

        })

        console.log("Database connected successufully")
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    } catch (error) {

        console.error("Error al sincronizar la base de datos")

    }
}

init()