fetch("https://autos-backend-8wzv.onrender.com/autos")
  .then(response => response.json())
  .then(data => {

    const contenedor = document.getElementById("vehiculos");

    contenedor.innerHTML = ""; // limpia antes de cargar

    data.forEach(auto => {

      contenedor.innerHTML += `
        <div class="auto-card">

          <div class="auto-img">
            <img src="${auto.imagen}" alt="${auto.marca} ${auto.modelo}">
          </div>

          <div class="auto-info">
            <h3>${auto.marca} ${auto.modelo}</h3>
            <p>Año: ${auto.año}</p>
            <p>Precio: $${auto.precio}</p>
          </div>

        </div>
      `;

    });

  })
  .catch(error => console.error("Error:", error));