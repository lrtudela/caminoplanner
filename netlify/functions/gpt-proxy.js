const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

exports.handler = async (event) => {
  try {
    const { prompt } = JSON.parse(event.body);

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
