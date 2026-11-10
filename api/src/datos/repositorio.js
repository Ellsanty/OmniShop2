// Esta capa en memoria podrá sustituirse por Supabase o PostgreSQL sin cambiar las rutas.
const productos = [
  { id: 'gpu-5070ti', nombre: 'RTX 5070 Ti 16GB', marca: 'NVIDIA', cat: 'GPUs', precio: 899, stock: 14 },
  { id: 'gpu-4060', nombre: 'RTX 4060 8GB', marca: 'NVIDIA', cat: 'GPUs', precio: 299, stock: 32 },
  { id: 'cpu-7800x3d', nombre: 'Ryzen 7 7800X3D', marca: 'AMD', cat: 'CPUs', precio: 369, stock: 21 },
  { id: 'cpu-7600', nombre: 'Ryzen 5 7600', marca: 'AMD', cat: 'CPUs', precio: 199, stock: 40 },
  { id: 'ram-vengeance', nombre: 'Vengeance 32GB DDR5 6000', marca: 'Corsair', cat: 'Memoria y SSD', precio: 109, stock: 48 },
  { id: 'ssd-990', nombre: '990 EVO Plus 1TB NVMe', marca: 'Samsung', cat: 'Memoria y SSD', precio: 89, stock: 55 },
  { id: 'lap-rog', nombre: 'ROG Strix G16', marca: 'ASUS', cat: 'Portátiles', precio: 1249, stock: 9 },
  { id: 'lap-ideapad', nombre: 'IdeaPad Slim 5', marca: 'Lenovo', cat: 'Portátiles', precio: 649, stock: 17 },
  { id: 'mon-27qhd', nombre: 'Monitor 27" QHD 165Hz', marca: 'LG', cat: 'Monitores', precio: 279, stock: 26 },
  { id: 'mon-34uw', nombre: 'Monitor 34" Ultrawide 144Hz', marca: 'Xiaomi', cat: 'Monitores', precio: 449, stock: 12 },
  { id: 'mon-24fhd', nombre: 'Monitor 24" FHD 180Hz', marca: 'AOC', cat: 'Monitores', precio: 139, stock: 38 },
  { id: 'kb-75', nombre: 'Teclado mecánico 75% RGB', marca: 'Keychron', cat: 'Periféricos', precio: 99, stock: 33 },
  { id: 'mouse-pro', nombre: 'Mouse inalámbrico 26K DPI', marca: 'Logitech', cat: 'Periféricos', precio: 59, stock: 60 },
  { id: 'headset-71', nombre: 'Headset gamer 7.1', marca: 'HyperX', cat: 'Periféricos', precio: 79, stock: 28 },
  { id: 'psu-850', nombre: 'Fuente 850W 80+ Gold', marca: 'Corsair', cat: 'Fuentes y refrigeración', precio: 119, stock: 22 },
  { id: 'aio-240', nombre: 'Refrigeración líquida 240mm RGB', marca: 'NZXT', cat: 'Fuentes y refrigeración', precio: 89, stock: 18 }
];

const pedidos = [];

function listarProductos() {
  return productos;
}

function buscarProducto(id) {
  return productos.find(producto => producto.id === id);
}

function guardarPedido(pedido, productosEnPedido) {
  const pedidoGuardado = {
    id: pedidos.length + 1,
    ...pedido
  };

  productosEnPedido.forEach(({ producto, cantidad }) => {
    producto.stock -= cantidad;
  });
  pedidos.push(pedidoGuardado);

  return pedidoGuardado;
}

module.exports = {
  listarProductos,
  buscarProducto,
  guardarPedido
};
