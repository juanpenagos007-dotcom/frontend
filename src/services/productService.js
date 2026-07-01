const API_URL = "http://ProyApi802.somee.com/api/Productos";

export async function getProductos() {
  const res = await fetch(`${API_URL}/Lista`);

  const data = await res.json();

  console.log("RESPUESTA API COMPLETA:", data);

  return data.response; // 👈 SOLO el array
}