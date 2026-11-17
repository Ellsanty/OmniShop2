import datosVisuales from "../datosVisuales.js";

function TarjetaProducto({ producto, textoBoton, alHacerClick, cantidad }) {
  const visual = datosVisuales[producto.id];

  return (
    <article className="card">
      <div className="art">
        {visual?.destacado && <span className="badge dest">DESTACADO</span>}
        {visual?.precioAnterior && <span className="badge off">OFERTA</span>}
        {visual?.imagen && (
          <img
            className="product-image"
            src={`/img/${visual.imagen}`}
            alt={producto.nombre}
            loading="lazy"
          />
        )}
      </div>
      <div className="brand">{producto.marca}</div>
      <h3>{producto.nombre}</h3>
      {visual?.calificacion && (
        <div className="rate">
          ★ {visual.calificacion} <span>({producto.stock} disponibles)</span>
        </div>
      )}
      {visual?.especificaciones && (
        <div className="specs-mini">{visual.especificaciones.join(" · ")}</div>
      )}
      <div className="prow">
        <div className="price">
          <b>${producto.precio.toLocaleString("en-US")}</b>
        </div>
        {visual?.precioAnterior && (
          <div className="before">${visual.precioAnterior.toLocaleString("en-US")}</div>
        )}
      </div>
      {producto.stock <= 0 ? (
        <span className="stock out">Sin stock</span>
      ) : producto.stock <= 8 ? (
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
