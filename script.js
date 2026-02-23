fetch("https://autos-backend-8wzv.onrender.com/autos")
  .then(response => response.json())
  .then(data => {

    const contenedor = document.getElementById("vehiculos");
    contenedor.innerHTML = "";

    data.forEach(auto => {

      // 🔹 Valores seguros (evita undefined)
      const marca = auto.marca ?? "Sin marca";
      const modelo = auto.modelo ?? "";
      const anio = auto.anio ?? "No especificado";
      const precio = auto.precio ?? "Consultar";
      const imagen = auto.imagen ?? "https://via.placeholder.com/400x250?text=Sin+Imagen";

      contenedor.innerHTML += `
        <div class="auto-card">

          <div class="auto-img">
            <img src="${imagen}" alt="${marca} ${modelo}">
          </div>

          <div class="auto-info">
            <h3>${marca} ${modelo}</h3>
            <p>Año: ${anio}</p>
            <p>Precio: $${precio}</p>
          </div>

        </div>
      `;
    });

  })
  .catch(error => {
    console.error("Error:", error);
  });