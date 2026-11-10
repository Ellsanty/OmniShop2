function responder(respuesta, codigo, datos) {
  return respuesta.status(codigo).json(datos);
}

function responderError(respuesta, codigo, mensaje) {
  return responder(respuesta, codigo, { error: mensaje });
}

module.exports = {
  responder,
  responderError
};
