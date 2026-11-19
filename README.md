# OmniShop

OmniShop es una tienda de tecnología universitaria con un catálogo, carrito e inventario conectados a una API. El proyecto reúne una API Node/Express, una interfaz React y una versión estática histórica en la raíz.

## Integrantes

- **Santiago José Penso Peña** — Corte 3: back-end en Node/Express (`api/`) con capas, validación y pruebas con Vitest; front en React (`front/`) con `TarjetaProducto` y conexión a la API; repositorio, ramas y Pull Requests; README y despliegue objetivo en AWS S3 y EC2. Cortes anteriores, según la documentación previa: Arquitectura Backend, Flask y Despliegue en Netlify.
- **Cristian Diaz (completar: nombre completo, lo confirmo con él)** — Cortes anteriores, según la documentación previa: Gestión de Base de Datos y Configuración de Conexiones. Corte 3: (completar: confirmar con él qué hizo).
- **Cristian Cantillo (completar: nombre completo, lo confirmo con él)** — Cortes anteriores, según la documentación previa: Pruebas, Control de Git y Documentación de Rutas. Corte 3: (completar: confirmar con él qué hizo).

## Tecnologías

- JavaScript.
- Front-end: React y Vite.
- Back-end: Node.js y Express, con módulos CommonJS.
- Pruebas del back-end: Vitest.
- CORS: `cors`.
- Despliegue objetivo: AWS S3 para el front y AWS EC2 para la API.

## Cómo levantarlo en local

Requiere Git y Node.js con npm. Clona el repositorio:

```powershell
git clone https://github.com/Ellsanty/OmniShop2.git
cd OmniShop2
```

Abre dos terminales de PowerShell.

**Terminal 1 — API** (escucha en el puerto `3000` por defecto):

```powershell
cd .\api
npm.cmd install
$env:PORT = "3000"
$env:ORIGEN_FRONT = "http://localhost:5173"
npm.cmd run dev
```

**Terminal 2 — front** (Vite usa el puerto `5173` por defecto):

```powershell
cd .\front
npm.cmd install
npm.cmd run dev
```

Abre la URL que muestre Vite, normalmente `http://localhost:5173`. El archivo `front/.env.development` configura `VITE_API_URL=http://localhost:3000` para el desarrollo local.

Variables de entorno:

| Variable | Uso | Valor local / origen |
|---|---|---|
| `PORT` | Puerto donde escucha Express. | `3000` (también es el valor predeterminado en `api/src/servidor.js`). |
| `ORIGEN_FRONT` | Único origen permitido por CORS. | `http://localhost:5173` en desarrollo; en la entrega, la URL pública del bucket S3. |
| `VITE_API_URL` | URL base que usa el front para solicitar datos y crear pedidos. | `http://localhost:3000` en desarrollo; en producción, la URL pública de la API en EC2. |

`api/.env.example` y `front/.env.example` contienen valores de ejemplo, no endpoints de producción. En PowerShell, si la política de ejecución impide usar `npm`, ejecuta `npm.cmd` como en estos comandos.

## Endpoints de la API

Las rutas están definidas en `api/src/rutas/tienda.js`.

| Método | Ruta | Qué hace | Respuesta |
|---|---|---|---|
| GET | `/productos` | Devuelve el catálogo con sus metadatos visuales y los indicadores de stock. | `200` con un arreglo de productos. |
| GET | `/productos/resumen` | Resume el número de productos, el valor del inventario y los productos con stock bajo. | `200` con `totalProductos`, `valorInventario` y `stockBajo`. |
| POST | `/pedidos` | Valida y registra un pedido, calcula sus totales en el back-end y actualiza el stock. | `201` con el pedido creado; `400` si el pedido no es válido o no hay stock suficiente; `404` si algún producto no existe. |

## Cómo correr las pruebas

Las pruebas automatizadas disponibles son las de Vitest en `api/`:

```powershell
cd .\api
npm.cmd test
```

Se espera que Vitest finalice correctamente con **21 pruebas aprobadas**. El front no define un script de pruebas; su compilación de producción se puede validar con:

```powershell
cd .\front
npm.cmd run build
```

La compilación genera `front/dist/`.

## Despliegue

El despliegue previsto es el front estático en un bucket S3 y la API en una instancia EC2. Las direcciones reales se completarán después del despliegue:

- URL pública del front en S3: **(completar después del despliegue)**.
- IP o URL pública de la API en EC2: **(completar después del despliegue)**.

Para volver a desplegar el front, configura la URL pública de la API antes de compilar y sube el contenido de `dist/` a la raíz del bucket:

```powershell
cd .\front
$env:VITE_API_URL = "<URL pública de la API en EC2>"
npm.cmd run build
aws s3 sync .\dist\ s3://<nombre-del-bucket>
```

En EC2, actualiza la API, instala sus dependencias y configúrala con el puerto de servicio y el origen exacto del front en S3. Después, inicia `api/src/servidor.js` con el entorno configurado, por ejemplo:

```sh
cd api
npm ci
PORT=3000 ORIGEN_FRONT="<URL pública del front en S3>" node src/servidor.js
```

El proceso de mantener la API activa y las direcciones finales dependen de la configuración de EC2, que se completará después del despliegue.

### Seguridad y dependencias

- `npm.cmd audit` en `api/`: **found 0 vulnerabilities**.
- `npm.cmd audit` en `front/`: **found 0 vulnerabilities**.
- Medidas contempladas: validación de pedidos en el servidor; archivos `.env` fuera de Git y ejemplos sin secretos; CORS restringido a un origen explícito; Security Group de EC2 con los puertos y orígenes mínimos necesarios (configuración de despliegue pendiente de verificar); ejecución de `npm audit` para revisar dependencias.

## Documentación adicional

### Front estático original

La versión estática de la raíz conserva la interfaz inicial de OmniShop y sus recursos de Netlify (`netlify.toml` y `_redirects`). Sus páginas incluyen la portada, carrito, inicio de sesión, registro, perfil, historial de pedidos, inventario y administración de usuarios. El catálogo estático de la portada se genera desde `script.js`. Esta versión es distinta del front React que está en `front/`.

Estructura estática principal documentada:

```text
├── img/                     # Recursos gráficos de la versión estática
├── _redirects               # Reglas de redirección de Netlify
├── netlify.toml             # Configuración de Netlify
├── index.html               # Página principal estática
├── carrito.html             # Carrito
├── login.html               # Inicio de sesión
├── registro.html            # Registro
├── perfil.html              # Perfil de cliente
├── mis_pedidos.html         # Historial de pedidos
├── inventario.html          # Vista estática de inventario
├── admin_usuarios.html      # Vista de administración de usuarios
├── style.css                # Estilos de la versión estática
└── script.js                # Interacciones de la versión estática
```

### Arquitectura y estimaciones de una propuesta anterior

La siguiente información se conserva de la documentación previa de la Unidad 2. Describe una propuesta anterior y sus estimaciones; no confirma que la infraestructura o las mediciones se hayan desplegado o vuelto a verificar. La implementación actual de este repositorio contiene la API Node/Express y un repositorio de datos en memoria.

| Componente | Arquitectura anterior | Destino propuesto entonces |
|---|---|---|
| Frontend estático | Netlify | S3 (alojamiento de sitio estático) |
| Backend | Flask en Render, en un repo aparte | EC2 |
| Base de datos | PostgreSQL en Supabase, en un repo aparte | RDS |
| Usuarios y permisos del equipo | N/A | IAM |

La región propuesta en esa documentación era `us-east-1` (Norte de Virginia). Se anotaron estas latencias desde Barranquilla, que se conservan como valores históricos documentados:

| Región | Latencia anotada |
|---|---|
| us-east-1 (Virginia) | 73 ms |
| eu-west-1 (Irlanda) | 156 ms |
| sa-east-1 (São Paulo) | 161 ms |

La propuesta indicaba que `us-east-1` tuvo la menor latencia medida y era la región acordada por el curso.

Estimación mensual anterior para un escenario con EC2 t3.micro, 20 GB EBS, RDS db.t3.micro con 20 GB, un bucket S3 de aproximadamente 1 GB y 5 GB de salida de datos en `us-east-1`:

| Componente | Escenario A: 24/7 (USD/mes) | Escenario A (COP/mes) | Escenario B: 4 horas/día (USD/mes) | Escenario B (COP/mes) |
|---|---:|---:|---:|---:|
| EC2 t3.micro | $7.59 | $23.319 | $1.01 | $3.100 |
| EBS 20 GB | $2.00 | $6.145 | $2.00 | $6.145 |
| RDS db.t3.micro (cómputo) | $21.90 | $67.283 | $21.90 | $67.283 |
| RDS storage 20 GB | $2.30 | $7.066 | $2.30 | $7.066 |
| S3 (frontend) | $0.02 | $61 | $0.02 | $61 |
| Salida de datos (5 GB) | $0.45 | $1.383 | $0.45 | $1.383 |
| **Total estimado** | **≈ $34.26** | **≈ $105.256** | **≈ $27.68** | **≈ $85.038** |

La conclusión anterior destacaba que optimizar el tiempo de uso de EC2 o apagarla automáticamente durante desarrollo podría reducir costos. Esas cifras son estimaciones históricas, no costos actuales confirmados.
