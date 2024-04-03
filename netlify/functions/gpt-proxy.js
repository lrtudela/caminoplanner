const { OpenAIApi } = require("openai");

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const openai = new OpenAIApi({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: body.prompt,
      max_tokens: 150,
      temperature: 0.7,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ data: completion.data.choices[0].text.trim() }),
    };
  } catch (error) {
    console.error("Error en gpt-proxy.js:", error);
    return { statusCode: 500, body: JSON.stringify({ error: "Error procesando la solicitud." }) };
  }
};
