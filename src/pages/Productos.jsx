import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
    listarProductos,
    crearProducto,
    editarProducto,
    eliminarProducto
} from "../services/productoService";

export default function Productos() {

    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);

    const [mostrarModal, setMostrarModal] = useState(false);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [productoId, setProductoId] = useState(null);

    const [form, setForm] = useState({
        nombre: "",
        precio: "",
        stock: ""
    });

    useEffect(() => {
        cargar();
    }, []);

    async function cargar() {
        try {
            setLoading(true);
            const data = await listarProductos();
            setProductos(data || []);
        } catch (error) {
            console.log(error);
            toast.error("Error cargando productos");
        } finally {
            setLoading(false);
        }
    }

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    function abrirCrear() {
        setModoEdicion(false);
        setProductoId(null);

        setForm({
            nombre: "",
            precio: "",
            stock: ""
        });

        setMostrarModal(true);
    }

    function abrirEditar(p) {
        setModoEdicion(true);
        setProductoId(p.idProducto);

        setForm({
            nombre: p.nombre,
            precio: p.precio,
            stock: p.stock
        });

        setMostrarModal(true);
    }

    async function guardar() {
        try {

            if (!form.nombre || !form.precio) {
                toast.error("Completa los campos");
                return;
            }

            const payload = {
                nombre: form.nombre,
                precio: Number(form.precio),
                stock: Number(form.stock),
                estado: true,
                idCategoria: 1 // fijo para que NO falle backend
            };

            if (modoEdicion) {
                await editarProducto(productoId, payload);
                toast.success("Producto actualizado");
            } else {
                await crearProducto(payload);
                toast.success("Producto creado");
            }

            setMostrarModal(false);
            cargar();

        } catch (error) {
            console.log(error);
            toast.error("Error en operación");
        }
    }

    async function eliminar(id) {
        try {
            if (!confirm("¿Eliminar producto?")) return;

            await eliminarProducto(id);
            toast.success("Eliminado");

            cargar();

        } catch (error) {
            console.log(error);
            toast.error("Error eliminando");
        }
    }

    return (
        <div className="container mt-4">

            <div className="d-flex justify-content-between mb-4">
                <h1>Productos</h1>

                <button className="btn btn-success" onClick={abrirCrear}>
                    + Crear
                </button>
            </div>

            {loading ? (
                <p>Cargando...</p>
            ) : productos.length === 0 ? (
                <p>No hay productos</p>
            ) : (
                productos.map(p => (
                    <div key={p.idProducto} className="card mb-2 p-3">

                        <h5>{p.nombre}</h5>
                        <p>${p.precio}</p>
                        <p>Stock: {p.stock}</p>

                        <button onClick={() => abrirEditar(p)} className="btn btn-warning me-2">
                            Editar
                        </button>

                        <button onClick={() => eliminar(p.idProducto)} className="btn btn-danger">
                            Eliminar
                        </button>

                    </div>
                ))
            )}

            {mostrarModal && (
                <div className="modal d-block" style={{ background: "rgba(0,0,0,0.5)" }}>

                    <div className="modal-dialog">
                        <div className="modal-content p-3">

                            <h4>{modoEdicion ? "Editar" : "Crear"}</h4>

                            <input
                                name="nombre"
                                placeholder="Nombre"
                                className="form-control mb-2"
                                value={form.nombre}
                                onChange={handleChange}
                            />

                            <input
                                name="precio"
                                type="number"
                                placeholder="Precio"
                                className="form-control mb-2"
                                value={form.precio}
                                onChange={handleChange}
                            />

                            <input
                                name="stock"
                                type="number"
                                placeholder="Stock"
                                className="form-control mb-2"
                                value={form.stock}
                                onChange={handleChange}
                            />

                            <button className="btn btn-primary w-100" onClick={guardar}>
                                Guardar
                            </button>

                            <button className="btn btn-secondary mt-2 w-100" onClick={() => setMostrarModal(false)}>
                                Cancelar
                            </button>

                        </div>
                    </div>

                </div>
            )}

        </div>
    );
}