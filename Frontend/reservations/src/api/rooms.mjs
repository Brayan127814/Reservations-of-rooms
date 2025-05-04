const urlRoom = "http://localhost:5000/rooms"

class ServiceRoom {

    static async RegistrarHabitacion(tipo, piso, numeroHabitacion, descripcion, capacidad, precio, imageUrl) {
        const token = localStorage.getItem("token")
        if (!token) {
            throw new Error('Debe estár logueado en el sistema para esta accion')
        }

        try {

            const response = await fetch(`${urlRoom}/register`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`

                },
                body: JSON.stringify({
                    tipo, piso, numeroHabitacion, descripcion, capacidad, precio, imageUrl
                })
            })

            if (!response.ok) {

                const errorData = await response.json().catch(() => ({}))
                throw new Error(errorData.message || "No se pudo registrar la habitación")
            }


            return await response.json()

        } catch (error) {
            throw new Error(`No se pudo registrar la habitacion  ${error}`)
        }


    }

    //metodo para cosumir api en la que se obtienen las habitaciones dispnibles
    //y mostrarlas en la pagina principal


    static async getRoom() {
        try {
            const response = await fetch(`${urlRoom}/`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                throw new Error(errorData.message || 'No se encontraron habitaciones')
            }

            return await response.json()

        } catch (error) {
            throw new Error(`No se pudo registrar la habitacion  ${error}`)

        }
    }
}

export default ServiceRoom