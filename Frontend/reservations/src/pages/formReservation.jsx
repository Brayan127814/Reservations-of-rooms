import { useEffect, useState } from "react";
import ServiceReservation from "../api/reservas.mjs";
import ServiceRoom from "../api/rooms.mjs";
import { useParams } from "react-router-dom";
import Header from "../componentes/Headers";
import '../stilos/reservas.css'
function ReservationForm() {
    const { idRoom} = useParams();
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");
    const [habitacion, setHabitacion] = useState(null); // Cambiado de `rooms` a un objeto único
    const [numeroPersonas, setNumeroPersonas] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Cargar la habitación específica por ID
    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const response = await ServiceRoom.getRoomID(idRoom); // Asume que `getRoomID` retorna { data, message, status }
                if (response.data) {
                    setHabitacion(response.data || []); // Guardamos directamente el objeto de la habitación
                } else {
                    setError("Habitación no encontrada");
                }
            } catch (error) {
                setError("Error al cargar la habitación");
                console.error("Error en fetchRoom:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchRoom();
    }, [idRoom]); // Se ejecuta cuando cambia el `id`

    const handleReservar = async () => {
        if (!fechaInicio || !fechaFin || !numeroPersonas) {
            alert("Todos los campos son obligatorios");
            return;
        }

        try {
            await ServiceReservation.crearReserva(
                fechaInicio,
                fechaFin,
                numeroPersonas,
                parseInt(idRoom)
            );
            alert("Reserva exitosa");
            // Limpiar formulario
            setFechaInicio("");
            setFechaFin("");
            setNumeroPersonas("");
        } catch (error) {
            console.error("Error al crear reserva:", error);
            alert("Error al realizar la reserva. Verifica los datos.");
        }
    };

    // Estados de carga y error
    if (loading) return <div>Cargando información...</div>;
    if (error) return <div className="error-message">{error}</div>;
    if (!habitacion) return <div>No se encontró la habitación.</div>;

    return ( 
       
        <div className="form-container">
            
            <h2>Reservar Habitación #{idRoom}</h2>
            
            {/* Detalles de la habitación */}
            <div className="room-details">
                <img 
                    src={habitacion.imageUrl} 
                    alt={`Habitación ${habitacion.tipo}`} 
                    className="room-image" 
                />
                <p><strong>Tipo:</strong> {habitacion.tipo}</p>
                <p><strong>Precio:</strong> ${habitacion.precio}</p>
                <p><strong>Capacidad:</strong> {habitacion.capacidad} personas</p>
            </div>

            {/* Formulario de reserva */}
            <div className="form-group">
                <label htmlFor="fechaInicio">Fecha de Inicio</label>
                <input
                    type="date"
                    id="fechaInicio"
                    value={fechaInicio}
                    required
                    onChange={(e) => setFechaInicio(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label htmlFor="fechaFin">Fecha de Salida</label>
                <input
                    type="date"
                    id="fechaFin"
                    value={fechaFin}
                    required
                    onChange={(e) => setFechaFin(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label htmlFor="numeroPersonas">Número de Personas</label>
                <input
                    type="number"
                    id="numeroPersonas"
                    value={numeroPersonas}
                    min="1"
                    max={habitacion.capacidad} // Valida contra la capacidad máxima
                    required
                    onChange={(e) => setNumeroPersonas(e.target.value)}
                />
            </div>

            <button onClick={handleReservar} className="reserve-button">
                Confirmar Reserva
            </button>
        </div>
    );
}

export default ReservationForm;