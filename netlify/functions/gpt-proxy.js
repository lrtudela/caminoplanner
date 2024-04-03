const { Configuration, OpenAIApi } = require("openai");

exports.handler = async function(event) {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: JSON.stringify({ error: "Método no permitido" }) };
    }

    // Verifica que la clave API está configurada
    if (!process.env.OPENAI_API_KEY) {
        console.error("Falta la clave API de OpenAI");
        return { statusCode: 500, body: JSON.stringify({ error: "La clave API de OpenAI no está configurada." }) };
    }

    let prompt;
    try {
        prompt = JSON.parse(event.body).prompt;
    } catch (error) {
        console.error("Error al parsear el cuerpo de la solicitud:", error);
        return { statusCode: 400, body: JSON.stringify({ error: "Cuerpo de la solicitud mal formado" }) };
    }

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
