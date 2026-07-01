import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import toast from "react-hot-toast";

export default function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function iniciarSesion() {

        if (!email || !password) {
            toast.error("Completa los campos");
            return;
        }

        try {

            setLoading(true);

            const res = await login({ email, password });

            // backend devuelve: token, nombre, roles
            localStorage.setItem("token", res.token);
            localStorage.setItem("nombre", res.nombre);
            localStorage.setItem("roles", JSON.stringify(res.roles));

            toast.success("Bienvenido " + res.nombre);

            navigate("/");

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message ||
                error.response?.data ||
                "Credenciales incorrectas"
            );

        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="container mt-5" style={{ maxWidth: "400px" }}>

            <h2>Login</h2>

            <input
                className="form-control mb-2"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                className="form-control mb-2"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button
                className="btn btn-primary w-100"
                onClick={iniciarSesion}
                disabled={loading}
            >
                {loading ? "Entrando..." : "Login"}
            </button>

        </div>
    );
}