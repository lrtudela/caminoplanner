document.getElementById('itineraryForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Previene el envío normal del formulario
    
    // Cambia el texto del botón para indicar que el proceso está en marcha
    const generateButton = document.getElementById('generateItinerary');
    generateButton.textContent = 'Generando itinerario...';

    // Simula el envío de datos al servidor (en una implementación real, aquí incluirías los datos del formulario)
    const dataToSend = { prompt: "Esto es una prueba de conexión." };

    // Llama a la función de Netlify
    fetch('/.netlify/functions/gpt-proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
    .then(response => response.json())
    .then(data => {
      // Muestra la respuesta de prueba en el contenedor de resultados
      document.getElementById('results').textContent = data.data;
      // Cambia el texto del botón de nuevo
      generateButton.textContent = 'Volver a Generar';
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById('results').textContent = 'Ha ocurrido un error al generar el itinerario.';
      generateButton.textContent = 'Volver a Generar';
    });
});
