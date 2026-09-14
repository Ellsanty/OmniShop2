## 👥 Autores y Colaboradores
* **Santiago José Penso Peña** - Arquitectura Backend, Flask y Despliegue en Netlify
* **Cristian Diaz** - Gestión de Base de Datos y Configuración de Conexiones
* **Cristian Cantillo** - Pruebas, Control de Git y Documentación de Rutas

# 🛒 OmniShop - Frontend E-commerce (Netlify)

Repositorio oficial de la interfaz visual y la versión frontend estática de **OmniShop**, configurada para despliegue continuo en **Netlify**.

## 🚀 Descripción del Proyecto
Este proyecto contiene la maquetación completa y el diseño de la experiencia de usuario (UI/UX) de un marketplace moderno. Incluye vistas interactivas para el catálogo de productos, gestión de carrito, paneles de administración de usuarios e inventario, y vistas de perfil de cliente.

## ⚙️ Configuración y Despliegue
* Cuenta con un archivo `netlify.toml` y `_redirects` optimizados para el enrutamiento correcto de las vistas estáticas en Netlify.
* Diseñado con un enfoque responsivo y adaptativo para dispositivos móviles y de escritorio.

## 📂 Estructura de Archivos
```text
├── img/                     # Recursos gráficos y multimedia
├── _redirects               # Reglas de redirección para Netlify
├── netlify.toml             # Configuración de despliegue en Netlify
├── index.html               # Página principal / Inicio
├── productos.html           # Catálogo general de productos
├── carrito.html             # Vista de carrito de compras y resumen
├── login.html               # Vista de inicio de sesión
├── registro.html            # Vista de registro de nuevos usuarios
├── perfil.html              # Vista de perfil de usuario
├── mis_pedidos.html         # Historial de compras del cliente
├── inventario.html          # Panel visual de gestión de stock
├── admin_usuarios.html      # Panel visual de administración de usuarios
├── style.css                # Estilos globales y diseño visual del e-commerce
└── script.js                # Lógica de interacción frontend y eventos de UI
```

## ☁️ Arquitectura Objetivo (Unidad 2 - Cloud Computing)

Como parte de la Unidad 2, este proyecto migrará de su infraestructura actual (Netlify como PaaS) hacia una arquitectura propia gestionada en AWS (IaaS).

### Mapeo de arquitectura actual → AWS

| Componente | Actual | Destino en AWS |
|---|---|---|
| Frontend estático (este repo) | Netlify | S3 (alojamiento de sitio estático) |
| Backend (Flask, repo aparte) | Render | EC2 |
| Base de datos (PostgreSQL, repo aparte) | Supabase | RDS |
| Usuarios y permisos del equipo | N/A | IAM |

> **Nota:** El backend y la base de datos viven en el repositorio de OmniShop (Flask + Supabase). Este repositorio corresponde únicamente a la capa de frontend, hoy servida como PaaS en Netlify.

### Región elegida: us-east-1 (Norte de Virginia)

Se midió la latencia desde Barranquilla hacia tres regiones usando cloudping.info:

| Región | Latencia |
|---|---|
| us-east-1 (Virginia) | 73 ms |
| eu-west-1 (Irlanda) | 156 ms |
| sa-east-1 (São Paulo) | 161 ms |

**us-east-1** presentó la menor latencia, a pesar de no ser la más cercana geográficamente a Colombia. Además es una de las regiones más económicas de AWS y cuenta con mayor disponibilidad de servicios. Por estas razones, y porque es la región acordada por el curso para que los recursos de todo el equipo puedan conectarse entre sí, se elige **us-east-1** como región de trabajo para la Unidad 2.

### 💰 Costo mensual estimado

Arquitectura mínima simulada: servidor EC2 t3.micro (backend Flask), 20 GB de disco EBS, base de datos RDS db.t3.micro con 20 GB de almacenamiento (PostgreSQL), bucket S3 para el frontend estático (~1 GB), y 5 GB de salida de datos al mes. Servidor encendido 24/7 (`us-east-1`).

| Componente | Costo/mes |
|---|---|
| EC2 t3.micro | $7.59 |
| EBS 20GB | $2.00 |
| RDS db.t3.micro (compute) | $21.90 |
| RDS storage 20GB | $2.30 |
| S3 (frontend) | $0.02 |
| Salida de datos (5GB) | $0.45 |
| **Total estimado** | **≈ $34.26 USD/mes** |

> Nota: para cuentas AWS creadas después de julio de 2025 ya no aplica el free tier clásico de 12 meses. La cuenta institucional del curso puede contar con créditos iniciales que cubran este costo durante el semestre.