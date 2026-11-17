import { useEffect, useState } from "react";
import { crearPedido, obtenerProductos } from "./api.js";
import TarjetaProducto from "./components/TarjetaProducto.jsx";

const secciones = [
  { id: "catalogo", nombre: "Catálogo" },
  { id: "carrito", nombre: "Carrito" },
  { id: "inventario", nombre: "Inventario" },
];

function App() {
  const [seccionActiva, setSeccionActiva] = useState("catalogo");
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState("");
  const [errorPedido, setErrorPedido] = useState("");
  const [pedidoCreado, setPedidoCreado] = useState(null);
  const [comprando, setComprando] = useState(false);

  async function cargarProductos() {
    setCargando(true);
    setErrorCarga("");

    try {
      const datos = await obtenerProductos();
      setProductos(datos);
    } catch (error) {
      setErrorCarga(
        error instanceof Error ? error.message : "No se pudieron cargar los productos.",
      );
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargarProductos();
  }, []);

  function agregarAlCarrito(producto) {
    setCarrito((itemsActuales) => {
      const productoEnCarrito = itemsActuales.find(
        (item) => item.producto.id === producto.id,
      );

      if (productoEnCarrito) {
        return itemsActuales.map((item) =>
          item.producto.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item,
        );
      }

      return [...itemsActuales, { producto, cantidad: 1 }];
    });
    setErrorPedido("");
    setPedidoCreado(null);
  }

  function quitarDelCarrito(idProducto) {
    setCarrito((itemsActuales) =>
      itemsActuales.filter((item) => item.producto.id !== idProducto),
    );
    setPedidoCreado(null);
  }

  async function comprar() {
    setComprando(true);
    setErrorPedido("");

    try {
      const pedido = await crearPedido(
        carrito.map(({ producto, cantidad }) => ({
          idProducto: producto.id,
          cantidad,
        })),
      );
      setPedidoCreado(pedido);
      setCarrito([]);
      await cargarProductos();
    } catch (error) {
      setErrorPedido(
        error instanceof Error ? error.message : "No se pudo crear el pedido.",
      );
    } finally {
      setComprando(false);
    }
  }

  return (
    <div className="aplicacion">
      <header className="encabezado">
        <div className="contenedor encabezado__contenido">
          <a className="marca-sitio" href="#inicio" onClick={() => setSeccionActiva("catalogo")}>
            OmniShop<span>▮</span>
          </a>
          <nav className="navegacion" aria-label="Secciones de OmniShop">
            {secciones.map((seccion) => (
              <button
                key={seccion.id}
                className={seccionActiva === seccion.id ? "navegacion__boton activa" : "navegacion__boton"}
                type="button"
                aria-pressed={seccionActiva === seccion.id}
                onClick={() => setSeccionActiva(seccion.id)}
              >
                {seccion.nombre}
                {seccion.id === "carrito" && ` (${carrito.length})`}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="contenedor contenido">
        <section className="introduccion">
          <p className="introduccion__etiqueta">TECNOLOGÍA DEL FUTURO</p>
          <h1>Todo para tu próxima configuración.</h1>
          <p>Explora productos, revisa tu carrito y consulta el inventario disponible.</p>
        </section>

        {cargando && <p className="aviso">Cargando productos…</p>}
        {errorCarga && (
          <div className="aviso aviso--error" role="alert">
            <span>{errorCarga}</span>
            <button className="boton-secundario" type="button" onClick={cargarProductos}>
              Reintentar
            </button>
          </div>
        )}
        {errorPedido && (
          <p className="aviso aviso--error" role="alert">
            {errorPedido}
          </p>
        )}

        {!cargando && !errorCarga && seccionActiva === "catalogo" && (
          <section aria-labelledby="titulo-catalogo">
            <div className="titulo-seccion">
              <div>
                <p className="introduccion__etiqueta">DESCUBRE OMNISHOP</p>
                <h2 id="titulo-catalogo">Catálogo</h2>
              </div>
              <span>{productos.length} productos</span>
            </div>
            <div className="rejilla-productos">
              {productos.map((producto) => (
                <TarjetaProducto
                  key={producto.id}
                  producto={producto}
                  textoBoton="Agregar al carrito"
                  alHacerClick={() => agregarAlCarrito(producto)}
                />
              ))}
            </div>
          </section>
        )}

        {!cargando && !errorCarga && seccionActiva === "carrito" && (
          <section aria-labelledby="titulo-carrito">
            <div className="titulo-seccion">
              <div>
                <p className="introduccion__etiqueta">TU SELECCIÓN</p>
                <h2 id="titulo-carrito">Carrito</h2>
              </div>
            </div>

            {carrito.length === 0 && !pedidoCreado && (
              <p className="aviso">Todavía no has agregado productos al carrito.</p>
            )}

            {carrito.length > 0 && (
              <>
                <div className="rejilla-productos">
                  {carrito.map(({ producto, cantidad }) => (
                    <TarjetaProducto
                      key={producto.id}
                      producto={producto}
                      cantidad={cantidad}
                      textoBoton="Quitar"
                      alHacerClick={() => quitarDelCarrito(producto.id)}
                    />
                  ))}
                </div>
                <button
                  className="boton-principal boton-comprar"
                  type="button"
                  onClick={comprar}
                  disabled={comprando}
                >
                  {comprando ? "Procesando pedido…" : "Comprar"}
                </button>
              </>
            )}

            {pedidoCreado && (
              <section className="pedido-confirmado" aria-live="polite">
                <p className="introduccion__etiqueta">COMPRA CONFIRMADA</p>
                <h3>Pedido #{pedidoCreado.id} creado</h3>
                <ul className="pedido-confirmado__items">
                  {pedidoCreado.items.map((item) => (
                    <li key={`${pedidoCreado.id}-${item.nombre}`}>
                      <span>{item.nombre} · cantidad {item.cantidad}</span>
                      <span>${item.precio}</span>
                    </li>
                  ))}
                </ul>
                <p>Subtotal: <strong>${pedidoCreado.subtotal}</strong></p>
                <p>Total: <strong>${pedidoCreado.total}</strong></p>
              </section>
            )}
          </section>
        )}

        {!cargando && !errorCarga && seccionActiva === "inventario" && (
          <section aria-labelledby="titulo-inventario">
            <div className="titulo-seccion">
              <div>
                <p className="introduccion__etiqueta">DISPONIBILIDAD ACTUAL</p>
                <h2 id="titulo-inventario">Inventario</h2>
              </div>
              <span>Datos actualizados desde la API</span>
            </div>
            <div className="rejilla-productos">
              {productos.map((producto) => (
                <TarjetaProducto key={producto.id} producto={producto} />
              ))}
            </div>
          </section>
        )}
      </main>
      <footer className="pie-pagina">OmniShop · Catálogo conectado a la API</footer>
    </div>
  );
}

export default App;
