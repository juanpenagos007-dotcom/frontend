import api from "../config/api";

export const listarProductos = async () => {
    const { data } = await api.get("/Productos/Lista");
    return data.response;
};

export const crearProducto = async (producto) => {
    const { data } = await api.post("/Productos/Guardar", producto);
    return data;
};

export const editarProducto = async (id, producto) => {
    const { data } = await api.put(`/Productos/Editar/${id}`, producto);
    return data;
};

export const eliminarProducto = async (id) => {
    const { data } = await api.delete(`/Productos/Eliminar/${id}`);
    return data;
};