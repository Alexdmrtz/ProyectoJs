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

  // Creación del array de periodos

  let periodos = Array.from({ length: plazoMeses }, (_, i) => i + 1);

  // Cálculo del interés ganado en cada período

  let interesesMensuales = periodos.map((periodo) => {
    let interesMensual = capitalInicial * tasaMensual;
    capitalInicial += interesMensual;
    interesGanado += interesMensual;
    return interesMensual.toFixed(2);
  });

  // Cálculo del monto total al vencimiento

  let montoTotal = capitalInicial.toFixed(2);

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

// Ejemplo de uso

let continuar = true;

while (continuar) {
  let capital = prompt("Ingrese el capital a invertir:");
  let tasa = prompt("Ingrese la tasa anual:");
  let plazo = prompt("Ingrese el plazo en meses:");

  let resultado = simularPlazoFijo(parseFloat(capital), parseFloat(tasa), parseFloat(plazo));
  alert(resultado);

  if (!confirm("Desea seguir operando?")) {
    continuar = false;
  }
}
