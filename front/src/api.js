const BASE = import.meta.env.VITE_API_URL;

export async function obtenerProductos() {
  const respuesta = await fetch(`${BASE}/productos`);
  const datos = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(datos.error);
  }

  return datos;
}

export async function crearPedido(items) {
  const respuesta = await fetch(`${BASE}/pedidos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ items }),
  });
  const datos = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(datos.error);
  }

  return datos;
}
