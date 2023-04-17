//Simulador de plazos fijos.

function simularPlazoFijo(capitalInicial, tasaAnual, plazoMeses, cantidadPeriodos) {

  // Validación de los parámetros de entrada

  if (isNaN(capitalInicial) || capitalInicial <= 0) {
    return "El capital ingresado no es válido.";
  }
  if (isNaN(tasaAnual) || tasaAnual <= 0) {
    return "La tasa anual ingresada no es válida.";
  }
  if (isNaN(plazoMeses) || plazoMeses <= 0) {
    return "El plazo en meses ingresado no es válido.";
  }
  if (isNaN(cantidadPeriodos) || cantidadPeriodos <= 0) {
    return "La cantidad de períodos ingresada no es válida.";
  }

  // Cálculo de la tasa mensual y del interés ganado

  let tasaMensual = tasaAnual / 12;
  let interesGanado = capitalInicial * tasaMensual * (plazoMeses / 12);

  // Cálculo del monto total al vencimiento para cada período y acumulación de los resultados

  let montoTotalAcumulado = capitalInicial + interesGanado;
  for (let i = 2; i <= cantidadPeriodos; i++) {
    interesGanado = montoTotalAcumulado * tasaMensual * (plazoMeses / 12);
    montoTotalAcumulado += interesGanado;
  }

  // Devolución del resultado formateado

  return `Al vencimiento de ${cantidadPeriodos} períodos de ${plazoMeses} meses, su plazo fijo de $${capitalInicial} a una tasa del ${tasaAnual}% anual habrá generado un interés total de $${(montoTotalAcumulado - capitalInicial).toFixed(2)}, y el monto total acumulado será de $${montoTotalAcumulado.toFixed(2)}.`;
}

// Ejemplo de uso

let capital = prompt("Ingrese el capital a invertir:");
let tasa = prompt("Ingrese la tasa anual en porcentaje:");
let plazo = prompt("Ingrese el plazo en meses:");
let cantidadPeriodos = prompt("Ingrese la cantidad de períodos:");

let resultado = simularPlazoFijo(parseFloat(capital), parseFloat(tasa), parseFloat(plazo), parseInt(cantidadPeriodos));
alert(resultado);

