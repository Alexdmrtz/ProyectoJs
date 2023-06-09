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

 // Realizar la solicitud para obtener las tasas de interés
 fetch('tasas-interes.json')
 .then(function(response) {
   return response.json();
 })
 .then(function(data) {
   const tasas = data;
   // Utilizar las tasas de interés obtenidas en el cálculo del plazo fijo
   const resultado = simularPlazoFijo(capital, tasas.plazoFijo, plazo);
   // Mostrar el resultado en el DOM
   resultadoDiv.textContent = resultado;
   resultadoDiv.style.display = "block";

   // Crear objeto de simulación
   const simulacion = {
     capital: capital,
     tasa: tasa,
     plazo: plazo,
     resultado: resultado
   };

   // Registrar la simulación en el archivo simulaciones.json
   fetch('simulaciones.json', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify(simulacion)
   })
     .then(function(response) {
       console.log('Simulación registrada con éxito');
     })
     .catch(function(error) {
       console.error(error);
     });
 })
 .catch(function(error) {
   console.error(error);
 });
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

  // Devolución del resultado formateado
  return `Al vencimiento, su plazo fijo de $${resultado.capitalInicial} a una tasa del ${resultado.tasaAnual}% anual por ${resultado.plazoMeses} meses habrá generado un interés de $${resultado.interesGanado}, y el monto total será de $${resultado.montoTotal}. Los intereses mensuales son: ${resultado.interesesMensuales.join(", ")}.`;
}

// Función para mostrar el historial de simulaciones
function mostrarHistorialSimulaciones(simulaciones) {
  const historialUl = document.getElementById("historial");

  // Limpiar el historial existente
  historialUl.innerHTML = "";

  // Recorrer las simulaciones y crear elementos de lista para cada una
  simulaciones.forEach(function(simulacion) {
    const li = document.createElement("li");
    li.textContent = `Capital: $${simulacion.capital} - Tasa: ${simulacion.tasa}% - Plazo: ${simulacion.plazo} meses - Resultado: ${simulacion.resultado}`;
    historialUl.appendChild(li);
  });
}


  // Obtener el historial de simulaciones al cargar la página
  fetch('simulaciones.json')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      const simulaciones = data;
      // Mostrar el historial de simulaciones en el DOM
      mostrarHistorialSimulaciones(simulaciones);
    })
    .catch(function(error) {
      console.error(error);
    });
});