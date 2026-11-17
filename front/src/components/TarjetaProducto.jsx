function TarjetaProducto({ producto, textoBoton, alHacerClick, cantidad }) {
  return (
    <article className="tarjeta-producto">
      <div className="tarjeta-producto__encabezado">
        <span className="tarjeta-producto__marca">{producto.marca}</span>
        <span className="tarjeta-producto__categoria">{producto.cat}</span>
      </div>
      <h3>{producto.nombre}</h3>
      <p className="tarjeta-producto__precio">${producto.precio}</p>
      <p className="tarjeta-producto__stock">Existencias: {producto.stock}</p>
      {cantidad !== undefined && (
        <p className="tarjeta-producto__cantidad">Cantidad: {cantidad}</p>
      )}
      {textoBoton && alHacerClick && (
        <button
          className="boton-principal"
          type="button"
          onClick={alHacerClick}
        >
          {textoBoton}
        </button>
      )}
    </article>
  );
}

export default TarjetaProducto;
