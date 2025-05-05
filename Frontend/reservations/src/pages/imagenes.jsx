import ServiceRoom from "../api/rooms.mjs";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../stilos/img.css"; // Archivo CSS separado

function RoomGrid() {
    const [habitaciones, setHabitaciones] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate()
    

    useEffect(() => {
        const obtenerHabitaciones = async () => {
            try {
                const respuesta = await ServiceRoom.getRoom();
                setHabitaciones(respuesta.data || []);
                setCargando(false);
            } catch (error) {
                setError(error.message);
                setCargando(false);
            }
        };
        obtenerHabitaciones();
    }, []);

    if (error) {
        return <div className="error-message">Error: {error}</div>;
    }

    if (cargando) {
        return (
            <div className="loading-container">
                <div className="loading-animation">Cargando habitaciones...</div>
            </div>
        );
    }

    const handleReservetionClick = async (idRoom) => {
        navigate(`/reservar/${idRoom}`)
    }

    return (
        <div className="room-grid-container">
            <div className="rooms-grid">
                {habitaciones.map((habitacion, index) => (
                    <div key={index} className="room-card">
                        <div className="room-image-container">
                            <img
                                src={habitacion.imageUrl}
                                alt={`Habitación ${index + 1}`}
                                className="room-image"
                            />
                        </div>
                        <div className="room-content">
                            <h2 className="room-title">{habitacion.tipo}</h2>
                            <p className="room-description">{habitacion.descripcion}</p>
                            <div className="room-footer">
                                <span className="room-price">${habitacion.precio || 'Consultar'}</span>
                                <button className="reserve-button" onClick={()=>handleReservetionClick(habitacion.id)}>
                                    Reservar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RoomGrid;