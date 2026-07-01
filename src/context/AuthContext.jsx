import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const nombre = localStorage.getItem("nombre");
        const roles = JSON.parse(localStorage.getItem("roles") || "[]");

        if (token) {
            setUser({ token, nombre, roles });
        }
    }, []);

    const login = (data) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("nombre", data.nombre);
        localStorage.setItem("roles", JSON.stringify(data.roles));

        setUser({
            token: data.token,
            nombre: data.nombre,
            roles: data.roles
        });
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("nombre");
        localStorage.removeItem("roles");

        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}