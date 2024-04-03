const { OpenAIApi } = require('openai');

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const { prompt } = JSON.parse(event.body);
    
    // Inicializar el cliente de OpenAI directamente con la clave API
    const openai = new OpenAIApi({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completionResponse = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 150,
      temperature: 0.7,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ data: completionResponse.data.choices[0].text.trim() }),
    };
  } catch (error) {
    console.error("Error processing request:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" })
    };
  }
};
