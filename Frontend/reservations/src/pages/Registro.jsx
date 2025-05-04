import { useState } from "react";
import InicioDeSesion from "../api/login.mjs";
import formRegister from "../api/register.mjs";
import "../stilos/registro.css"; // Archivo CSS que crearemos después
import { useNavigate } from "react-router-dom";
const Registro = () => {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [cedula, setCedula] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoginView, setIsLoginView] = useState(true); // Para alternar entre login/registro
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (!isLoginView) {
                await formRegister(name, lastName, cedula, email, telefono, password);
                alert("Usuario registrado con éxito");
                navigate("/Header")
            } else {
                // Lógica para login (deberás implementarla)
                const data = await InicioDeSesion(email,password)
                alert("Inicio de sesion exitoso")
                navigate("/FormRoom")
                console.log(data)
                
            }
            // Limpiar formulario
            setName("");
            setLastName("");
            setCedula("");
            setEmail("");
            setTelefono("");
            setPassword("");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1 className="auth-title">Inicia sesión o crea una cuenta</h1>
                <p className="auth-subtitle">
                    Puedes iniciar sesión con tu cuenta para acceder a nuestros servicios
                </p>

                {!isLoginView && (
                    <div className="form-group-row">
                        <div className="form-group">
                            <label htmlFor="name">Nombre</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Apellido</label>
                            <input
                                type="text"
                                id="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                )}

                <div className="form-group">
                    <label htmlFor="email">E-mail</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Indica tu dirección de email"
                    />
                </div>

                {!isLoginView && (
                    <>
                        <div className="form-group-row">
                            <div className="form-group">
                                <label htmlFor="cedula">Cédula</label>
                                <input
                                    type="text"
                                    id="cedula"
                                    value={cedula}
                                    onChange={(e) => setCedula(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="telefono">Teléfono</label>
                                <input
                                    type="text"
                                    id="telefono"
                                    value={telefono}
                                    onChange={(e) => setTelefono(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </>
                )}

                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="auth-submit-btn" onClick={handleSubmit}>
                    {isLoginView ? "Iniciar sesion" : "Crear cuenta"}
                </button>

                <div className="auth-separator">
                    <span>o usar una de estas opciones</span>
                </div>

                <div className="social-buttons">
                    <button type="button" className="social-btn google-btn">
                        Continuar con Google
                    </button>
                    <button type="button" className="social-btn facebook-btn">
                        Continuar con Facebook
                    </button>
                </div>

                <div className="auth-footer">
                    <p>
                        Al iniciar sesión o al crear una cuenta, aceptas nuestros{" "}
                        <a href="#">Términos y condiciones</a> y la{" "}
                        <a href="#">Política de privacidad</a>
                    </p>
                    <p>Todos los derechos reservados.</p>
                    <p>Copyright (2006 - 2025) - Booking.com™</p>
                </div>

                <div className="auth-switch">
                    {isLoginView ? (
                        <p>
                            ¿No tienes una cuenta?{" "}
                            <button type="button" onClick={() => setIsLoginView(false)}>
                                Regístrate
                            </button>
                        </p>
                    ) : (
                        <p>
                            ¿Ya tienes una cuenta?{" "}
                            <button type="button" onClick={() => setIsLoginView(true)}>
                                Inicia sesión
                            </button>
                        </p>
                    )}
                </div>

                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );
};

export default Registro;