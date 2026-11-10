const {
  aplicarDescuento,
  calcularTotalCarrito,
  hayStock,
  tieneStockBajo,
  validarPedido,
  valorInventario
} = require('./reglas-tienda');

describe('calcularTotalCarrito', () => {
  it('suma precio por cantidad para todos los items', () => {
    expect(calcularTotalCarrito([
      { precio: 899, cantidad: 2 },
      { precio: 299, cantidad: 1 }
    ])).toBe(2097);
  });

  it('devuelve 0 para un carrito vacío', () => {
    // Caso límite: una lista vacía no debe producir un error ni un total distinto de cero.
    expect(calcularTotalCarrito([])).toBe(0);
  });
});

describe('aplicarDescuento', () => {
  it('aplica el descuento justo en el umbral de 1000', () => {
    // Caso límite: el umbral es inclusivo.
    expect(aplicarDescuento(1000)).toBe(900);
  });

  it('no aplica el descuento en 999', () => {
    // Caso límite: un total apenas inferior al umbral no recibe descuento.
    expect(aplicarDescuento(999)).toBe(999);
  });

  it('aplica el descuento a un pedido de dos productos de 899', () => {
    expect(aplicarDescuento(calcularTotalCarrito([
      { precio: 899, cantidad: 2 }
    ]))).toBeCloseTo(1618.2);
  });
});

describe('hayStock', () => {
  it('permite pedir una cantidad exactamente igual al stock', () => {
    // Caso límite: el stock coincide exactamente con la cantidad pedida.
    expect(hayStock({ stock: 3 }, 3)).toBe(true);
  });

  it('rechaza una cantidad mayor al stock', () => {
    expect(hayStock({ stock: 2 }, 3)).toBe(false);
  });

  it('rechaza una cantidad negativa', () => {
    // Caso límite: ninguna cantidad menor o igual a cero representa un pedido válido.
    expect(hayStock({ stock: 3 }, -1)).toBe(false);
  });

  it('rechaza una cantidad igual a cero', () => {
    expect(hayStock({ stock: 3 }, 0)).toBe(false);
  });
});

describe('tieneStockBajo', () => {
  it('marca stock bajo justo en el mínimo', () => {
    // Caso límite: el mínimo también se considera stock bajo.
    expect(tieneStockBajo({ stock: 5 })).toBe(true);
  });

  it('no marca como bajo un stock superior al mínimo', () => {
    expect(tieneStockBajo({ stock: 6 })).toBe(false);
  });
});

describe('valorInventario', () => {
  it('suma precio por stock de todos los productos', () => {
    expect(valorInventario([
      { precio: 10, stock: 2 },
      { precio: 5, stock: 4 }
    ])).toBe(40);
  });
});

describe('validarPedido', () => {
  it('devuelve null cuando el pedido es válido', () => {
    expect(validarPedido({
      items: [{ idProducto: 'gpu-5070ti', cantidad: 1 }]
    })).toBeNull();
  });

  it('informa que el pedido no tiene items', () => {
    // Caso límite: el pedido sin items no se considera válido.
    expect(validarPedido({ items: [] })).toMatch('al menos un item');
  });

  it('informa cuando falta idProducto', () => {
    expect(validarPedido({
      items: [{ cantidad: 1 }]
    })).toMatch('idProducto');
  });

  it('informa cuando falta cantidad', () => {
    expect(validarPedido({
      items: [{ idProducto: 'gpu-5070ti' }]
    })).toMatch('cantidad');
  });

  it('informa cuando cantidad es cero', () => {
    expect(validarPedido({
      items: [{ idProducto: 'gpu-5070ti', cantidad: 0 }]
    })).toMatch('entero mayor que 0');
  });

  it('informa cuando cantidad es negativa', () => {
    expect(validarPedido({
      items: [{ idProducto: 'gpu-5070ti', cantidad: -1 }]
    })).toMatch('entero mayor que 0');
  });

  it('informa cuando cantidad no es entera', () => {
    expect(validarPedido({
      items: [{ idProducto: 'gpu-5070ti', cantidad: 1.5 }]
    })).toMatch('entero mayor que 0');
  });
});
