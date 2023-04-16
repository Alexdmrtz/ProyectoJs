//Simulador de plazos fijos.

// Definimos las variables iniciales

var capital = prompt("Ingrese el capital a invertir: ");
var interes = prompt("Ingrese la tasa de interés anual: ");
var plazo = prompt("Ingrese el plazo en meses: ");
var interesMensual = (interes / 100) / 12;
var totalInteres = 0;
var totalCapital = parseFloat(capital);

// Comprobamos que los valores ingresados sean números

if (isNaN(capital) || isNaN(interes) || isNaN(plazo)) {
  alert("Ingrese valores numéricos válidos.");
} else {
  // Calculamos el interés y el capital final para cada mes

  for (var i = 1; i <= plazo; i++) {
    var interesMes = totalCapital * interesMensual;
    totalInteres += interesMes;
    totalCapital += interesMes;
  }

  // Mostramos los resultados
  
  alert("Capital inicial: $" + capital + "\nTasa de interés anual: " + interes + "%\nPlazo en meses: " + plazo + "\nCapital final: $" + totalCapital.toFixed(2) + "\nIntereses ganados: $" + totalInteres.toFixed(2));
}
