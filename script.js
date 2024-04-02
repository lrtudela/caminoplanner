document.getElementById('itineraryForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Evita el envío tradicional del formulario

    // Aquí recolectarías los valores del formulario
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    // Aquí convertirías los datos del formulario en un prompt para GPT
    console.log(formProps); // Remplaza esto con tu lógica para enviar los datos a GPT

    // Imaginemos que envías los datos a GPT y recibes una respuesta
    // Supongamos que esta es la respuesta de GPT (sustituye esto con la llamada real a la API)
    const gptResponse = "Aquí iría la respuesta generada por GPT basada en el formulario.";

    // Actualizas la interfaz de usuario con la respuesta
    document.getElementById('results').textContent = gptResponse;
});
