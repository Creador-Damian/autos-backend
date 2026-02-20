fetch("https://autos-backend-8wzv.onrender.com/autos")
    .then(response => response.json())
    .then(data => {
        const contenedor = document.getElementById("vehiculos");

        data.forEach(auto => {
            const autoHTML = `
                <div class="auto">
                    <h2>${auto.marca} ${auto.modelo}</h2>
                    <p>Año: ${auto.año}</p>
                    <p>Precio: $${auto.precio}</p>
                </div>
            `;

            contenedor.innerHTML += autoHTML;
        });
    })
    .catch(error => console.error("Error:", error));
