const { Configuration, OpenAIApi } = require("openai");

exports.handler = async function(event) {
    // Parsea el cuerpo de la solicitud entrante para obtener el prompt
    const { prompt } = JSON.parse(event.body);

    // Configuración de OpenAI con tu clave API
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    try {
        const completionResponse = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            temperature: 0.7,
            max_tokens: 150,
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ data: completionResponse.data.choices[0].text.trim() }),
        };
    } catch (error) {
        console.error("Error al solicitar a OpenAI:", error);
        return { statusCode: 500, body: JSON.stringify({ error: "Error interno del servidor al solicitar a OpenAI" }) };
    }
};
