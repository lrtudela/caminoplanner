const { Configuration, OpenAIApi } = require("openai");

exports.handler = async function(event) {
  // Solo permitir solicitudes POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Método no permitido" };
  }

  // Configura el cliente de la API de OpenAI
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  try {
    // Asume que el cuerpo de la solicitud contiene un campo 'prompt'
    const { prompt } = JSON.parse(event.body);

    // Realiza la llamada a la API de OpenAI
    const completion = await openai.createCompletion({
      model: "text-davinci-002", // Asegúrate de usar el modelo adecuado para tu uso
      prompt: prompt,
      max_tokens: 100, // Ajusta según la longitud deseada de la respuesta
      temperature: 0.7, // Ajusta para variar la creatividad de las respuestas
    });

    // Devuelve la respuesta de la API de OpenAI
    return {
      statusCode: 200,
      body: JSON.stringify({ data: completion.data.choices[0].text }),
    };
  } catch (error) {
    // Maneja cualquier error que ocurra durante la llamada a la API
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
