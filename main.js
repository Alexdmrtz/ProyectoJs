//Simulador de plazos fijos.

function simularPlazoFijo(capitalInicial, tasaAnual, plazoMeses, cantidadPeriodos) {

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

  // Cálculo del monto total al vencimiento para cada período y acumulación de los resultados

  for (let i = 1; i <= plazoMeses; i++) {
    let interesMensual = capitalInicial * tasaMensual;
    capitalInicial += interesMensual;
    interesGanado += interesMensual;
    console.log(`Interés ganado en el mes ${i}: ${interesMensual.toFixed(2)}`);
  }

  let montoTotal = capitalInicial;
  console.log(`Monto total al vencimiento: ${montoTotal.toFixed(2)}`);

  // Devolución del resultado formateado

  return `Al vencimiento, su plazo fijo de $${capitalInicial.toFixed(2)} a una tasa del ${tasaAnual}% anual por ${plazoMeses} meses habrá generado un interés de $${interesGanado.toFixed(2)}, y el monto total será de $${montoTotal.toFixed(2)}.`;
}

// Ejemplo de uso

let continuar = true;

while (continuar) {
  let capital = prompt("Ingrese el capital a invertir:");
  let tasa = 78;
  let plazo = prompt("Ingrese el plazo en meses:");

  let resultado = simularPlazoFijo(parseFloat(capital), parseFloat(tasa), parseFloat(plazo));
  alert(resultado);

  if (!confirm("Desea seguir operando?")) {
    continuar = false;
  }
}

