const express = require('express');
const cors = require('cors');
const tienda = require('./rutas/tienda');
const { responderError } = require('./utils/responder');

const aplicacion = express();
const puerto = process.env.PORT || 3000;

if (process.env.ORIGEN_FRONT) {
  aplicacion.use(cors({ origin: process.env.ORIGEN_FRONT }));
} else {
  // En la entrega, se debe restringir CORS configurando ORIGEN_FRONT.
  aplicacion.use(cors());
}

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
