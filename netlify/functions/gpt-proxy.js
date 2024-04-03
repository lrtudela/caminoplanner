exports.handler = async function(event) {
  // Solo permitir solicitudes POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Método no permitido" };
  }

  // Respuesta de prueba simulando la conexión y consulta a GPT
  const testResponse = "Probando la conexión con netlify...\ntratando de recuperar la clave de la api...\nhaciendo una consulta de prueba...\nRespuesta de la consulta de prueba...";

  return {
    statusCode: 200,
    body: JSON.stringify({ data: testResponse }),
  };
};
