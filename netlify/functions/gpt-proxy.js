const { Configuration, OpenAIApi } = require('openai');

exports.handler = async (event) => {
  try {
    // Asegurarse de que se recibe una solicitud POST con el cuerpo adecuado
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: 'Método no permitido' };
    }

    const body = JSON.parse(event.body);
    const prompt = body.prompt;

    // Configuración del cliente de OpenAI con tu clave API
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    // Realizar la solicitud a OpenAI
    const completionResponse = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 150,
      temperature: 0.7,
    });

    // Devolver la respuesta de OpenAI
    return {
      statusCode: 200,
      body: JSON.stringify({ data: completionResponse.data.choices[0].text.trim() }),
    };
  } catch (error) {
    console.error("Error en gpt-proxy.js:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error interno del servidor al solicitar a OpenAI" })
    };
  }
};
