document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('itineraryForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Previene el envío normal del formulario

        // Cambia el texto del botón para indicar que el proceso está en marcha
        const generateButton = document.getElementById('generateItinerary');
        generateButton.textContent = 'Generando itinerario...';

        // Recoge los datos del formulario
        const days = document.getElementById('days').value;
        const pathPreference = document.getElementById('pathPreference').value;
        const mode = document.getElementById('mode').value;
        // Suponiendo que estos son los únicos campos que quieres enviar
        const prompt = `Tengo ${days} días de vacaciones y los quiero pasar haciendo el Camino de Santiago, especialmente interesado en ${pathPreference}, y lo haré ${mode}.`;

        // Llama a la función de Netlify `gpt-proxy.js`
        fetch('/.netlify/functions/gpt-proxy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: prompt }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Datos procesados:", data); // Log para depuración
            // Asume que 'data' es un objeto que contiene una propiedad 'data' con el texto de la respuesta
            document.getElementById('results').textContent = data.data;
            generateButton.textContent = 'Volver a Generar';
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('results').textContent = 'Ha ocurrido un error al generar el itinerario.';
            generateButton.textContent = 'Generar Itinerario';
        });
    });
});
