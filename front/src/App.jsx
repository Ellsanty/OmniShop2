import { useEffect, useMemo, useState } from "react";
import { crearPedido, obtenerProductos } from "./api.js";
import TarjetaProducto from "./components/TarjetaProducto.jsx";
import datosVisuales from "./datosVisuales.js";

const secciones = [
  { id: "catalogo", nombre: "Catálogo" },
  { id: "carrito", nombre: "Carrito" },
  { id: "inventario", nombre: "Inventario" },
];

function App() {
  const [seccionActiva, setSeccionActiva] = useState("catalogo");
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [categoria, setCategoria] = useState("Todas");
  const [busqueda, setBusqueda] = useState("");
  const [orden, setOrden] = useState("reco");
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState("");
  const [errorPedido, setErrorPedido] = useState("");
  const [pedidoCreado, setPedidoCreado] = useState(null);
  const [comprando, setComprando] = useState(false);

  const categorias = useMemo(
    () => ["Todas", ...new Set(productos.map((producto) => producto.cat))],
    [productos],
  );

  const productosVisibles = useMemo(() => {
    const termino = busqueda.trim().toLocaleLowerCase();
    const resultado = productos.filter((producto) => {
      const coincideCategoria =
        categoria === "Todas" || producto.cat === categoria;
      const coincideBusqueda =
        !termino ||
        `${producto.nombre} ${producto.marca} ${producto.cat}`
          .toLocaleLowerCase()
          .includes(termino);
      return coincideCategoria && coincideBusqueda;
    });

    return resultado.sort((productoA, productoB) => {
      if (orden === "precio-asc") {
        return productoA.precio - productoB.precio;
      }
      if (orden === "precio-desc") {
        return productoB.precio - productoA.precio;
      }
      if (orden === "rating") {
        return (
          (datosVisuales[productoB.id]?.calificacion || 0) -
          (datosVisuales[productoA.id]?.calificacion || 0)
        );
      }
      return (
        Number(Boolean(datosVisuales[productoB.id]?.destacado)) -
          Number(Boolean(datosVisuales[productoA.id]?.destacado)) ||
        (datosVisuales[productoB.id]?.calificacion || 0) -
          (datosVisuales[productoA.id]?.calificacion || 0)
      );
    });
  }, [busqueda, categoria, orden, productos]);

  async function cargarProductos() {
    setCargando(true);
    setErrorCarga("");

    try {
      setProductos(await obtenerProductos());
    } catch (error) {
      setErrorCarga(
        error instanceof Error
          ? error.message
          : "No se pudieron cargar los productos.",
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
    <div>
      <header>
        <div className="wrap hbar">
          <a
            className="logo"
            href="#inicio"
            onClick={() => setSeccionActiva("catalogo")}
          >
            OmniShop<b>▮</b>
          </a>
          <nav className="links" aria-label="Secciones de OmniShop">
            {secciones
              .filter((seccion) => seccion.id !== "carrito")
              .map((seccion) => (
                <button
                  key={seccion.id}
                  className={
                    seccionActiva === seccion.id
                      ? "enlace-seccion activo"
                      : "enlace-seccion"
                  }
                  type="button"
                  aria-pressed={seccionActiva === seccion.id}
                  onClick={() => setSeccionActiva(seccion.id)}
                >
                  {seccion.nombre}
                </button>
              ))}
          </nav>
          <label className="search">
            <span>🔍</span>
            <input
              type="search"
              placeholder="Busca GPU, procesador, monitor…"
              aria-label="Buscar productos"
              value={busqueda}
              onChange={(evento) => setBusqueda(evento.target.value)}
            />
          </label>
          <button
            className="cart-btn"
            type="button"
            aria-label="Ir al carrito"
            onClick={() => setSeccionActiva("carrito")}
          >
            🛒 Carrito
            <span className={carrito.length ? "cnt" : "cnt hide"}>
              {carrito.reduce((total, item) => total + item.cantidad, 0)}
            </span>
          </button>
        </div>
      </header>

      <section className="hero">
        <div className="orb o1" />
        <div className="orb o2" />
        <div className="wrap">
          <h1>
            Tecnología del <span>futuro</span>, hoy (Versión 2).
          </h1>
          <p>
            Componentes para armar tu PC, portátiles, monitores y periféricos
            de última generación — con precios reales, fichas técnicas completas
            y envío gratis desde $99.
          </p>
          <div className="cta">
            <button
              className="btn btn-grad"
              type="button"
              onClick={() => setSeccionActiva("catalogo")}
            >
              Explorar catálogo →
            </button>
            <button
              className="btn btn-ghost"
              type="button"
              onClick={() => {
                setSeccionActiva("catalogo");
                setCategoria("Todas");
                setOrden("precio-desc");
              }}
            >
              Ofertas de la semana
            </button>
          </div>
          <div className="stats">
            <div><b><em>500+</em></b>productos verificados</div>
            <div><b><em>4.8★</em></b>valoración media</div>
            <div><b><em>24/7</em></b>soporte técnico</div>
            <div><b><em>12m</em></b>garantía incluida</div>
          </div>
        </div>
      </section>

      <main className="wrap">
        {errorCarga && (
          <div className="notice error-notice" role="alert">
            {errorCarga}
            <button className="btn btn-ghost" type="button" onClick={cargarProductos}>
              Reintentar
            </button>
          </div>
        )}
        {errorPedido && (
          <p className="notice error-notice" role="alert">
            {errorPedido}
          </p>
        )}
        {cargando && <p className="notice">Cargando productos…</p>}

        {!cargando && !errorCarga && seccionActiva === "catalogo" && (
          <section aria-label="Catálogo">
            <div className="toolbar">
              <div className="chips" aria-label="Filtrar por categoría">
                {categorias.map((nombreCategoria) => (
                  <button
                    key={nombreCategoria}
                    className={
                      categoria === nombreCategoria ? "chip on" : "chip"
                    }
                    type="button"
                    aria-pressed={categoria === nombreCategoria}
                    onClick={() => setCategoria(nombreCategoria)}
                  >
                    {nombreCategoria}
                  </button>
                ))}
              </div>
              <select
                className="sort"
                aria-label="Ordenar productos"
                value={orden}
                onChange={(evento) => setOrden(evento.target.value)}
              >
                <option value="reco">Recomendados</option>
                <option value="precio-asc">Precio: menor a mayor</option>
                <option value="precio-desc">Precio: mayor a menor</option>
                <option value="rating">Mejor valorados</option>
              </select>
            </div>
            <div className="grid">
              {productosVisibles.map((producto) => (
                <TarjetaProducto
                  key={producto.id}
                  producto={producto}
                  textoBoton="Añadir"
                  alHacerClick={() => agregarAlCarrito(producto)}
                />
              ))}
              {productosVisibles.length === 0 && (
                <div className="empty">
                  No hay productos que coincidan con tu búsqueda.
                </div>
              )}
            </div>
          </section>
        )}

        {!cargando && !errorCarga && seccionActiva === "carrito" && (
          <section className="cart-layout" aria-label="Carrito de compras">
            <div className="cart-items">
              <h2 className="cart-h">🛒 Tu carrito</h2>
              {carrito.length === 0 && !pedidoCreado && (
                <div className="cart-empty">
                  <div className="big">🛒</div>
                  <b>Tu carrito está vacío</b>
                  <br />
                  Explora el catálogo y agrega tus productos favoritos.
                </div>
              )}
              {carrito.map(({ producto, cantidad }) => (
                <TarjetaProducto
                  key={producto.id}
                  producto={producto}
                  cantidad={cantidad}
                  textoBoton="Quitar"
                  alHacerClick={() => quitarDelCarrito(producto.id)}
                />
              ))}
              {carrito.length > 0 && (
                <button
                  className="checkout"
                  type="button"
                  onClick={comprar}
                  disabled={comprando}
                >
                  {comprando ? "Procesando pedido…" : "Comprar"}
                </button>
              )}
              {pedidoCreado && (
                <section className="pedido-confirmado" aria-live="polite">
                  <p className="brand">¡PEDIDO REGISTRADO!</p>
                  <h3>Pedido #{pedidoCreado.id}</h3>
                  <ul className="order-lines">
                    {pedidoCreado.items.map((item) => (
                      <li key={`${pedidoCreado.id}-${item.nombre}`}>
                        <span>{item.nombre} · {item.cantidad}</span>
                        <span>${item.precio}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="row">
                    <span>Subtotal</span><span>${pedidoCreado.subtotal}</span>
                  </div>
                  <div className="row total">
                    <span>Total</span><b>${pedidoCreado.total}</b>
                  </div>
                </section>
              )}
            </div>
          </section>
        )}

        {!cargando && !errorCarga && seccionActiva === "inventario" && (
          <section aria-label="Inventario">
            <h2 className="cart-h">Panel de inventario</h2>
            <p className="page-note">Existencias actuales de los productos.</p>
            <div className="grid">
              {productos.map((producto) => (
                <TarjetaProducto key={producto.id} producto={producto} />
              ))}
            </div>
          </section>
        )}
      </main>

      <footer>
        <div className="wrap">
          <div className="fcols">
            <div>
              <a className="logo" href="#inicio" style={{ fontSize: 18 }}>
                OmniShop<b>▮</b>
              </a>
              <p className="descripcion-pie">
                La tienda de tecnología con estética del futuro. Precios reales,
                fichas técnicas y envío rápido.
              </p>
            </div>
            <div>
              <h4>Categorías</h4>
              <ul>
                <li>GPUs y tarjetas gráficas</li>
                <li>Procesadores</li>
                <li>Portátiles</li>
                <li>Monitores</li>
                <li>Periféricos</li>
              </ul>
            </div>
            <div>
              <h4>Soporte</h4>
              <ul>
                <li>Envíos y entregas</li>
                <li>Garantías</li>
                <li>Guía para armar tu PC</li>
                <li>Contacto 24/7</li>
              </ul>
            </div>
            <div>
              <h4>OmniShop</h4>
              <ul>
                <li>Sobre nosotros</li>
                <li>Proyecto · v0.1</li>
                <li>Modo estático</li>
                <li>Netlify ready</li>
              </ul>
            </div>
          </div>
          <div className="fcopy">
            © 2026 OmniShop · Prototipo de tienda — hecho con ⚡ y neón
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
