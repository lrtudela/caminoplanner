document.getElementById('itineraryForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Previene el envío normal del formulario

    const generateButton = document.getElementById('generateItinerary');
    generateButton.textContent = 'Generando itinerario...';

    const days = document.getElementById('days').value;
    const pathPreference = document.getElementById('pathPreference').value;
    const mode = document.getElementById('mode').value;
    const prompt = `Tengo ${days} días de vacaciones y los quiero pasar haciendo el Camino de Santiago, especialmente interesado en ${pathPreference}, y lo haré ${mode}.`;

    console.log("Enviando prompt:", prompt); // Log para depurar

    fetch('/.netlify/functions/gpt-proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: prompt }),
    })
    .then(response => {
        console.log("Respuesta recibida:", response); // Log para depurar
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("Datos procesados:", data); // Log para depurar
        document.getElementById('results').textContent = data.data;
        generateButton.textContent = 'Volver a Generar';
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('results').textContent = 'Ha ocurrido un error al generar el itinerario.';
        generateButton.textContent = 'Generar Itinerario';
    });
});
