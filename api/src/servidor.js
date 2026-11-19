const express = require('express');
const cors = require('cors');
const tienda = require('./rutas/tienda');
const { responderError } = require('./utils/responder');

const aplicacion = express();
const puerto = process.env.PORT || 3000;
const origenPermitido = process.env.ORIGEN_FRONT || 'http://localhost:5173';

// Limita CORS: en desarrollo solo Vite local y en producción solo la URL del bucket S3.
aplicacion.use(cors({ origin: origenPermitido }));

aplicacion.use(express.json());

function registrar(solicitud, respuesta, siguiente) {
  console.log(`${solicitud.method} ${solicitud.url}`);
  siguiente();
}

aplicacion.use(registrar);
aplicacion.use('/', tienda);
aplicacion.use((errorSolicitud, solicitud, respuesta, siguiente) => {
  if (
    errorSolicitud instanceof SyntaxError
    && errorSolicitud.status === 400
    && Object.prototype.hasOwnProperty.call(errorSolicitud, 'body')
  ) {
    return responderError(respuesta, 400, 'El cuerpo de la solicitud debe ser JSON válido.');
  }

  return siguiente(errorSolicitud);
});

aplicacion.listen(puerto, () => {
  console.log(`Servidor OmniShop disponible en el puerto ${puerto}.`);
});
