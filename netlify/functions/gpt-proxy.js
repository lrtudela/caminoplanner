const { Configuration, OpenAIApi } = require("openai");

exports.handler = async function(event) {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Método no permitido" };
    }

    const { prompt } = JSON.parse(event.body);
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003", // Asegúrate de elegir el modelo correcto
            prompt: prompt,
            max_tokens: 150,
            temperature: 0.7,
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ data: completion.data.choices[0].text.trim() }),
        };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: "Error al conectar con OpenAI" }) };
    }
};
