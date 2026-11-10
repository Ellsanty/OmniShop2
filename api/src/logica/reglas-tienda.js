// El catálogo usa estos niveles para identificar productos que requieren reposición.
const STOCK_MINIMO = 5;
// Este umbral hace que pedidos con productos como dos artículos de 899 reciban descuento.
const UMBRAL_DESCUENTO = 1000;
// El descuento se aplica en una proporción única para mantener el cálculo consistente.
const PORCENTAJE_DESCUENTO = 0.1;

function calcularTotalCarrito(items) {
  return items.reduce((total, item) => total + item.precio * item.cantidad, 0);
}

function aplicarDescuento(total) {
  return total >= UMBRAL_DESCUENTO
    ? total * (1 - PORCENTAJE_DESCUENTO)
    : total;
}

function hayStock(producto, cantidad) {
  return Boolean(
    producto
    && Number.isFinite(cantidad)
    && cantidad > 0
    && Number.isFinite(producto.stock)
    && producto.stock >= cantidad
  );
}

function tieneStockBajo(producto) {
  return Boolean(producto && producto.stock <= STOCK_MINIMO);
}

function valorInventario(productos) {
  return productos.reduce((total, producto) => total + producto.precio * producto.stock, 0);
}

function validarPedido(pedido) {
  if (!pedido || !Array.isArray(pedido.items) || pedido.items.length === 0) {
    return 'El pedido debe incluir al menos un item.';
  }

  for (const item of pedido.items) {
    if (
      !item
      || item.idProducto === undefined
      || item.idProducto === null
      || item.idProducto === ''
    ) {
      return 'Cada item debe incluir idProducto.';
    }

    if (item.cantidad === undefined || item.cantidad === null) {
      return 'Cada item debe incluir cantidad.';
    }

    if (!Number.isInteger(item.cantidad) || item.cantidad <= 0) {
      return 'La cantidad debe ser un entero mayor que 0.';
    }
  }

  return null;
}

module.exports = {
  STOCK_MINIMO,
  UMBRAL_DESCUENTO,
  PORCENTAJE_DESCUENTO,
  calcularTotalCarrito,
  aplicarDescuento,
  hayStock,
  tieneStockBajo,
  valorInventario,
  validarPedido
};
