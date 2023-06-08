document.addEventListener("DOMContentLoaded", function() {
  const simularButton = document.getElementById("simular");
  const resultadoDiv = document.getElementById("resultado");

  simularButton.addEventListener("click", function() {
    const capitalInput = document.getElementById("capital");
    const tasaInput = document.getElementById("tasa");
    const plazoInput = document.getElementById("plazo");

    const capital = parseFloat(capitalInput.value);
    const tasa = parseFloat(tasaInput.value);
    const plazo = parseFloat(plazoInput.value);

    const resultado = simularPlazoFijo(capital, tasa, plazo);

    resultadoDiv.textContent = resultado;
    resultadoDiv.style.display = "block";

    // Almacenar el resultado en el almacenamiento local (localStorage)
    localStorage.setItem("resultadoPlazoFijo", resultado);
  });

  // Función para simular el plazo fijo
  function simularPlazoFijo(capitalInicial, tasaAnual, plazoMeses) {
    // Validación de los parámetros de entrada
    if (isNaN(capitalInicial) || capitalInicial <= 0) {
      return "El capital ingresado no es válido.";
    }
    if (isNaN(tasaAnual) || tasaAnual <= 0) {
      return "La tasa anual ingresada no es válida.";
    }
    if (isNaN(plazoMeses) || plazoMeses < 1) {
      return "El plazo en meses ingresado no es válido.";
    }

    // Cálculo de la tasa mensual y del interés ganado
    let tasaMensual = tasaAnual / 12 / 100;
    let interesGanado = 0;
    let capitalActual = capitalInicial;

    // Creación del array de periodos
    let periodos = Array.from({ length: plazoMeses }, (_, i) => i + 1);

    // Cálculo del interés ganado en cada período
    let interesesMensuales = periodos.map((periodo) => {
      let interesMensual = capitalActual * tasaMensual;
      capitalActual += interesMensual;
      interesGanado += interesMensual;
      return interesMensual.toFixed(2);
    });

    // Cálculo del monto total al vencimiento
    let montoTotal = capitalActual.toFixed(2);

    // Creación del objeto resultado
    let resultado = {
      capitalInicial: capitalInicial.toFixed(2),
      tasaAnual: tasaAnual,
      plazoMeses: plazoMeses,
      interesesMensuales: interesesMensuales,
      interesGanado: interesGanado.toFixed(2),
      montoTotal: montoTotal
    };

    // Realizar solicitud a la API JSONPlaceholder (ejemplo ficticio)
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(function (response) {
        // Hacer algo con la respuesta de la API
        console.log(response.data);
      })
      .catch(function (error) {
        // Manejar errores de la solicitud
        console.error(error);
      });

    // Devolución del resultado formateado
    return `Al vencimiento, su plazo fijo de $${resultado.capitalInicial} a una tasa del ${resultado.tasaAnual}% anual por ${resultado.plazoMeses} meses habrá generado un interés de $${resultado.interesGanado}, y el monto total será de $${resultado.montoTotal}. Los intereses mensuales son: ${resultado.interesesMensuales.join(", ")}.`;
  }

  // Recuperar y mostrar el resultado almacenado al cargar la página
  const resultadoAlmacenado = localStorage.getItem("resultadoPlazoFijo");
  if (resultadoAlmacenado) {
    resultadoDiv.textContent = resultadoAlmacenado;
    resultadoDiv.style.display = "block";
  }
});