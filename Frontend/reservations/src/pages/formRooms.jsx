import React, { useState } from "react";
import ServiceRoom from "../api/rooms.mjs";
import "../stilos/room.css";

function FormRoom() {
    const [tipo, setTipo] = useState("");
    const [piso, setPiso] = useState("");
    const [numeroHabitacion, setNumeroHabitacion] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [capacidad, setCapacidad] = useState("");
    const [precio, setPrecio] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [error, setError] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await ServiceRoom.RegistrarHabitacion(
                tipo,
                piso,
                numeroHabitacion,
                descripcion,
                capacidad,
                precio,
                imageUrl
            );
            alert("Registro exitoso");
            setTipo("");
            setPiso("");
            setNumeroHabitacion("");
            setDescripcion("");
            setCapacidad("");
            setPrecio("");
            setImageUrl("");
            setError(false);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="form-container">
            <div className="card">
                <h1>Registro de habitaciones</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Tipo de habitación</label>
                        <input type="text" value={tipo} onChange={(e) => setTipo(e.target.value)} required />

                        <label>Piso</label>
                        <input type="number" value={piso} onChange={(e) => setPiso(e.target.value)} required />

                        <label>Número de habitación</label>
                        <input type="number" value={numeroHabitacion} onChange={(e) => setNumeroHabitacion(e.target.value)} required />

                        <label>Descripción</label>
                        <input type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />

                        <label>Capacidad</label>
                        <input type="number" value={capacidad} onChange={(e) => setCapacidad(e.target.value)} required />

                        <label>Precio</label>
                        <input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} required />

                        <label>URL de imagen</label>
                        <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />

                        <button type="submit">Registrar habitación</button>

                        {error && <p className="error">Error: {error}</p>}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FormRoom;
