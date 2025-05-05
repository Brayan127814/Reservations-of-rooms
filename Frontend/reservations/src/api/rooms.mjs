const urlRoom = "http://localhost:5000/rooms"

fetch(urlRoom)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error))

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

    static async getRoomID(idroom) {
        try {
            const response = await fetch(`${urlRoom}/getRoomByID/${idroom}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'No se encontraron habitaciones');
            }
    
            const result = await response.json();
    
            if (!result || !result.data) {
                throw new Error('No se encontraron habitaciones');
            }
    
            return result; // <-- este objeto debe tener .data
        } catch (error) {
            throw new Error('No se encontró la habitación: ' + error.message);
        }
    }
    
}

export default ServiceRoom