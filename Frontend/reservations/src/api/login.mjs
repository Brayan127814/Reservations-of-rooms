const url = "http://localhost:5000/auth"


const InicioDeSesion = async (email, password) => {

    try {

        const response = await fetch(`${url}/login`, {

            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })

        const data = await response.json()
        console.log(data)

        if (data.success) {
            localStorage.setItem("token", data.token)
            console.log(data)
            return data
        } else {
            throw new Error("Credenciales incorrectas")
        }




    } catch (error) {
        console.error("Error: ",error)
        throw new Error("Error de inicio de sesion")
    }
}

export default InicioDeSesion