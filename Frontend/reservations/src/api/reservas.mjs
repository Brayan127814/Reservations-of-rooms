

const url = "http://localhost:5000/reservations"


class ServiceReservation {

    static async crearReserva(fechaInicio, fechaFin, numeroPersonas, id) {
        const token = localStorage.getItem("token")
        if (!token) {
            throw new Error('Inicia sesión para realizar esta accion')
        }

        try {
            const response = await fetch(`${url}/create`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        fechaInicio, fechaFin, numeroPersonas, habitaciones:[{idRoom:id}]
                    })
                }
            )
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                throw new Error(errorData.message || 'No se pudo crear la reserva')
            }

            return await response.json()
        } catch (error) {

            throw new Error(error)
        }
    }
}

export default ServiceReservation