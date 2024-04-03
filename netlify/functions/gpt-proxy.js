const { OpenAI } = require("openai");

exports.handler = async function(event) {
    // Parsea el cuerpo de la solicitud entrante para obtener el prompt
    const { prompt } = JSON.parse(event.body);

    // Inicializa el cliente de OpenAI con tu clave API
    const openai = new OpenAI(process.env.OPENAI_API_KEY);

    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            temperature: 0.7,
            max_tokens: 150,
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ data: completion.data.choices[0].text.trim() }),
        };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};
