const url = "http://localhost:5000/auth"
/**
 * Registra un nuevo usuario en el sistema
 * @param {string} name - Nombre del usuario
 * @param {string} lastName - Apellido del usuario
 * @param {string} cedula - Cédula de identidad (nota: corregí el typo de "cudula" a "cedula")
 * @param {string} email - Correo electrónico
 * @param {string} telefono - Número de teléfono
 * @param {string} password - Contraseña
 * @returns {Promise<Object>} Respuesta del servidor
 * @throws {Error} Cuando hay errores en la solicitud o validación
 */

const formRegister = async (name, lastName, cedula, email, telefono, password) => {

    try {
        
        const response = await fetch(`${url}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    name,
                    lastName,
                    cedula,
                    email,
                    telefono,
                    password
                }
            )

        })

        if (!response.ok) {

            throw new Error("Erro al crear el usuario")
        }

        return await response.json()
        
    } catch (error) {

        console.log("Error: " + error)
        throw new Error("Error al registrar en la base de datos")

    }
}

export default formRegister