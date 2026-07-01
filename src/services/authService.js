import api from "../config/api";

export const login = async (datos) => {
    const { data } = await api.post("/Auth/login", datos);
    return data;
};

export const registrar = async (datos) => {
    const { data } = await api.post("/Auth/registrar", datos);
    return data;
};