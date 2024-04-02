const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    const body = JSON.parse(event.body);
    const response = await fetch("https://api.openai.com/v4/completions", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.GPT_API_KEY}`
        },
        body: JSON.stringify(body)
    });
    const data = await response.json();
    return {
        statusCode: 200,
        body: JSON.stringify(data)
    };
};
