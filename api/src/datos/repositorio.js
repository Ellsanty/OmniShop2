// Esta capa en memoria podrá sustituirse por Supabase o PostgreSQL sin cambiar las rutas.
const productos = [
  {
    id: 'gpu-5070ti', nombre: 'RTX 5070 Ti 16GB', marca: 'NVIDIA', cat: 'GPUs', precio: 899, stock: 14,
    imagen: 'GeForce-RTX™-5070-Ti-WINDFORCE-OC-SFF-16G-01.png',
    calificacion: 4.8,
    precioAnterior: 1049,
    destacado: true,
    especificaciones: ['Memoria', '16 GB GDDR7', 'Chip', 'Blackwell · 8,960 núcleos CUDA']
  },
  {
    id: 'gpu-4060', nombre: 'RTX 4060 8GB', marca: 'NVIDIA', cat: 'GPUs', precio: 299, stock: 32,
    imagen: 'images (3).jpg',
    calificacion: 4.6,
    precioAnterior: 339,
    especificaciones: ['Memoria', '8 GB GDDR6', 'Chip', 'Ada Lovelace · 3,072 núcleos']
  },
  {
    id: 'cpu-7800x3d', nombre: 'Ryzen 7 7800X3D', marca: 'AMD', cat: 'CPUs', precio: 369, stock: 21,
    imagen: '51HqC0rU9HL._AC_SL1500_.jpg',
    calificacion: 4.9,
    precioAnterior: 449,
    destacado: true,
    especificaciones: ['Núcleos / Hilos', '8 / 16', 'Caché', '96 MB L3 (3D V-Cache)']
  },
  {
    id: 'cpu-7600', nombre: 'Ryzen 5 7600', marca: 'AMD', cat: 'CPUs', precio: 199, stock: 40,
    imagen: 'D_NQ_NP_719037-MLA99972093783_112025-O.webp',
    calificacion: 4.7,
    precioAnterior: 219,
    especificaciones: ['Núcleos / Hilos', '6 / 12', 'Caché', '32 MB L3']
  },
  {
    id: 'ram-vengeance', nombre: 'Vengeance 32GB DDR5 6000', marca: 'Corsair', cat: 'Memoria y SSD', precio: 109, stock: 48,
    imagen: '20-236-909-02_square.jpg',
    calificacion: 4.8,
    precioAnterior: 129,
    especificaciones: ['Capacidad', '2 × 16 GB', 'Velocidad', '6,000 MT/s CL30']
  },
  {
    id: 'ssd-990', nombre: '990 EVO Plus 1TB NVMe', marca: 'Samsung', cat: 'Memoria y SSD', precio: 89, stock: 55,
    imagen: 'Samsung_1TB_990_EVO_Plus_BOX_1000x_02e0faf0-37cb-4fc2-8275-c58fdfb584fb.webp',
    calificacion: 4.7,
    precioAnterior: 109,
    especificaciones: ['Capacidad', '1 TB', 'Interfaz', 'PCIe 4.0 x4 · M.2 2280']
  },
  {
    id: 'lap-rog', nombre: 'ROG Strix G16', marca: 'ASUS', cat: 'Portátiles', precio: 1249, stock: 9,
    imagen: 'images.jpg',
    calificacion: 4.8,
    precioAnterior: 1399,
    destacado: true,
    especificaciones: ['Procesador', 'Intel Core i7-13650HX', 'GPU', 'RTX 4060 8GB']
  },
  {
    id: 'lap-ideapad', nombre: 'IdeaPad Slim 5', marca: 'Lenovo', cat: 'Portátiles', precio: 649, stock: 17,
    imagen: 'w=1500,h=1500,fit=cover.webp',
    calificacion: 4.5,
    precioAnterior: 719,
    especificaciones: ['Procesador', 'AMD Ryzen 7 7735HS', 'GPU', 'Radeon integrada']
  },
  {
    id: 'mon-27qhd', nombre: 'Monitor 27" QHD 165Hz', marca: 'LG', cat: 'Monitores', precio: 279, stock: 26,
    imagen: 'images (1).jpg',
    calificacion: 4.6,
    precioAnterior: 319,
    destacado: true,
    especificaciones: ['Panel', 'IPS · 2,560 × 1,440', 'Tasa de refresco', '165 Hz']
  },
  {
    id: 'mon-34uw', nombre: 'Monitor 34" Ultrawide 144Hz', marca: 'Xiaomi', cat: 'Monitores', precio: 449, stock: 12,
    imagen: 'images (5).jpg',
    calificacion: 4.4,
    precioAnterior: 499,
    especificaciones: ['Panel', 'VA · 3,440 × 1,440', 'Relación', '21:9 curvo']
  },
  {
    id: 'mon-24fhd', nombre: 'Monitor 24" FHD 180Hz', marca: 'AOC', cat: 'Monitores', precio: 139, stock: 38,
    imagen: 'images (4).jpg',
    calificacion: 4.5,
    precioAnterior: 159,
    especificaciones: ['Panel', 'VA · 1,920 × 1,080', 'Tasa de refresco', '180 Hz']
  },
  {
    id: 'kb-75', nombre: 'Teclado mecánico 75% RGB', marca: 'Keychron', cat: 'Periféricos', precio: 99, stock: 33,
    imagen: 'images (2).jpg',
    calificacion: 4.7,
    precioAnterior: 119,
    especificaciones: ['Formato', '75% · hot-swap', 'Switches', 'Rojos lineales']
  },
  {
    id: 'mouse-pro', nombre: 'Mouse inalámbrico 26K DPI', marca: 'Logitech', cat: 'Periféricos', precio: 59, stock: 60,
    imagen: 'D_NQ_NP_607996-MLA100010457619_122025-O.webp',
    calificacion: 4.6,
    precioAnterior: 69,
    especificaciones: ['Sensor', 'HERO 26K', 'Peso', '61 g']
  },
  {
    id: 'headset-71', nombre: 'Headset gamer 7.1', marca: 'HyperX', cat: 'Periféricos', precio: 79, stock: 28,
    imagen: '1_bf44a5e1-bfad-426b-9666-9ab7b10ee719.webp',
    calificacion: 4.5,
    precioAnterior: 95,
    especificaciones: ['Sonido', '7.1 virtual', 'Drivers', '53 mm']
  },
  {
    id: 'psu-850', nombre: 'Fuente 850W 80+ Gold', marca: 'Corsair', cat: 'Fuentes y refrigeración', precio: 119, stock: 22,
    imagen: 'D_NQ_NP_930241-MLA99522507928_122025-O.webp',
    calificacion: 4.7,
    precioAnterior: 139,
    especificaciones: ['Potencia', '850 W · 80+ Gold', 'Modular', 'Full modular']
  },
  {
    id: 'aio-240', nombre: 'Refrigeración líquida 240mm RGB', marca: 'NZXT', cat: 'Fuentes y refrigeración', precio: 89, stock: 18,
    imagen: 'images (6).jpg',
    calificacion: 4.4,
    precioAnterior: 109,
    especificaciones: ['Radiador', '240 mm · 2 × 120 mm', 'Bomba', '3,000 RPM']
  }
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
