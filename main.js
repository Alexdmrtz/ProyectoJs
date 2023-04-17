//Simulador de plazos fijos.

function simularPlazoFijo(capitalInicial, tasaAnual, plazoMeses) {

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

  // Cálculo de la tasa mensual y del interés ganado
  
  let tasaMensual = tasaAnual / 12;
  let interesGanado = capitalInicial * tasaMensual * (plazoMeses / 12);

  // Cálculo del monto total al vencimiento

  let montoTotal = capitalInicial + interesGanado;

  // Devolución del resultado formateado

  return `Al vencimiento, su plazo fijo de $${capitalInicial} a una tasa del ${tasaAnual}% anual por ${plazoMeses} meses habrá generado un interés de $${interesGanado.toFixed(2)}, y el monto total será de $${montoTotal.toFixed(2)}.`;
}

// Ejemplo de uso

let capital = prompt("Ingrese el capital a invertir:");
let tasa = prompt("Ingrese la tasa anual en porcentaje:");
let plazo = prompt("Ingrese el plazo en meses:");

let resultado = simularPlazoFijo(parseFloat(capital), parseFloat(tasa), parseFloat(plazo));
alert(resultado);

