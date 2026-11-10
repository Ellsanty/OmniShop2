const express = require('express');
const {
  aplicarDescuento,
  calcularTotalCarrito,
  hayStock,
  tieneStockBajo,
  validarPedido,
  valorInventario
} = require('../logica/reglas-tienda');
const {
  buscarProducto,
  guardarPedido,
  listarProductos
} = require('../datos/repositorio');
const { responder, responderError } = require('../utils/responder');

const tienda = express.Router();

tienda.get('/productos', (solicitud, respuesta) => {
  return responder(respuesta, 200, listarProductos());
});

tienda.get('/productos/resumen', (solicitud, respuesta) => {
  const productos = listarProductos();
  const resumen = {
    totalProductos: productos.length,
    valorInventario: valorInventario(productos),
    stockBajo: productos.filter(tieneStockBajo).length
  };

  return responder(respuesta, 200, resumen);
});

tienda.post('/pedidos', (solicitud, respuesta) => {
  const errorValidacion = validarPedido(solicitud.body);
  if (errorValidacion) {
    return responderError(respuesta, 400, errorValidacion);
  }

  const cantidadesPorProducto = new Map();
  for (const item of solicitud.body.items) {
    const producto = buscarProducto(item.idProducto);
    if (!producto) {
      return responderError(
        respuesta,
        404,
        `No existe el producto con id ${item.idProducto}.`
      );
    }

    const cantidadActual = cantidadesPorProducto.get(item.idProducto)?.cantidad || 0;
    cantidadesPorProducto.set(item.idProducto, {
      producto,
      cantidad: cantidadActual + item.cantidad
    });
  }

  const productosEnPedido = Array.from(cantidadesPorProducto.values());
  for (const entrada of productosEnPedido) {
    if (!hayStock(entrada.producto, entrada.cantidad)) {
      return responderError(
        respuesta,
        400,
        `Stock insuficiente para ${entrada.producto.nombre}. Disponible: ${entrada.producto.stock}. Solicitado: ${entrada.cantidad}.`
      );
    }
  }

  const items = productosEnPedido.map(({ producto, cantidad }) => ({
    nombre: producto.nombre,
    cantidad,
    precio: producto.precio
  }));
  const subtotal = calcularTotalCarrito(items);
  const total = aplicarDescuento(subtotal);
  const pedidoGuardado = guardarPedido(
    { items, subtotal, total },
    productosEnPedido
  );

  return responder(respuesta, 201, pedidoGuardado);
});

module.exports = tienda;
