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