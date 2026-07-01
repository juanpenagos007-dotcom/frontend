import { useState } from "react";
import { registrar } from "../services/authService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Registro() {

    const navigate = useNavigate();

    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function registrarUsuario() {

        if (!nombre || !email || !password) {
            toast.error("Completa los campos");
            return;
        }

        try {
            setLoading(true);

            const res = await registrar({
                nombre,
                email,
                password,
                tipoDoc: "CC",
                nroDoc: "000",
                roles: [1]
            });

            toast.success(res.msj || "Usuario creado");

            navigate("/login");

        } catch (error) {
            console.log(error);

            toast.error(
                error.response?.data?.msj ||
                error.response?.data ||
                "Error al registrar"
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="container mt-5" style={{ maxWidth: "400px" }}>

            <h2>Registro</h2>

            <input className="form-control mb-2"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
            />

            <input className="form-control mb-2"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input className="form-control mb-2"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button
                className="btn btn-success w-100"
                onClick={registrarUsuario}
                disabled={loading}
            >
                {loading ? "Creando..." : "Crear cuenta"}
            </button>

        </div>
    );
}