function TarjetaProducto({ producto, textoBoton, alHacerClick, cantidad }) {
  return (
    <article className="card">
      <div className="art">
        {producto.destacado && <span className="badge dest">DESTACADO</span>}
        {producto.precioAnterior && <span className="badge off">OFERTA</span>}
        {producto.imagen && (
          <img
            className="product-image"
            src={`/img/${producto.imagen}`}
            alt={producto.nombre}
            loading="lazy"
          />
        )}
      </div>
      <div className="brand">{producto.marca}</div>
      <h3>{producto.nombre}</h3>
      {producto.calificacion && (
        <div className="rate">
          ★ {producto.calificacion} <span>({producto.stock} disponibles)</span>
        </div>
      )}
      {producto.especificaciones && (
        <div className="specs-mini">{producto.especificaciones.join(" · ")}</div>
      )}
      <div className="prow">
        <div className="price">
          <b>${producto.precio.toLocaleString("en-US")}</b>
        </div>
        {producto.precioAnterior && (
          <div className="before">${producto.precioAnterior.toLocaleString("en-US")}</div>
        )}
      </div>
      {producto.agotado ? (
        <span className="stock out">Sin stock</span>
      ) : producto.stockBajo ? (
        <span className="stock low">Últimas unidades</span>
      ) : (
        <span className="stock">En stock</span>
      )}
      {cantidad !== undefined && (
        <p className="specs-mini">Cantidad: {cantidad}</p>
      )}
      {textoBoton && alHacerClick && (
        <div className="cactions">
          <button className="b-add" type="button" onClick={alHacerClick}>
            {textoBoton}
          </button>
        </div>
      )}
    </article>
  );
}

export default TarjetaProducto;
