const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.handler = async (event) => {
  try {
    const { prompt } = JSON.parse(event.body);

    // Usando la SDK correctamente de acuerdo a la documentación actualizada
    const response = await openai.Completions.create({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.7,
      max_tokens: 150,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ data: response.choices[0].text.trim() }),
    };
  } catch (error) {
    console.error("Error al solicitar a OpenAI:", error);
    return { statusCode: 500, body: JSON.stringify({ error: "Error interno del servidor al solicitar a OpenAI" }) };
  }
};
