// index.js
// File constants
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

// Funtions
/**
 * Returns the current values of all text input fields.
 * @param None
 * @return {Set}
 */
function getInputs(){
  let allInputs = {
    "P1Health" : document.getElementById("P1HP").value,
    "P1Ac" : document.getElementById("P1AC").value,
    "P1HitDice" : document.getElementById("P1HitDice").value,
    "P1DamageDice" : document.getElementById("P1DamageDice").value,
    "P2Health" : document.getElementById("P2HP").value,
    "P2Ac" : document.getElementById("P2AC").value,
    "P2HitDice" : document.getElementById("P2HitDice").value,
    "P2DamageDice" : document.getElementById("P2DamageDice").value
  };
  /* Use this code snippet to iterate through the object if necessary.
  for (const [key, value] of Object.entries(allInputs)) {
    console.log(`${key}: ${value}`);
  }
  */
  return allInputs;
}

/**
 * Removes all current values for text input fields.
 * @param {None}
 */
function clearAllInputs(){
  console.log("Clear all inputs");
  document.getElementById("P1HP").value = "";
  document.getElementById("P1AC").value = "";
  document.getElementById("P1HitDice").value = "";
  document.getElementById("P1DamageDice").value = "";
  document.getElementById("P2HP").value = "";
  document.getElementById("P2AC").value = "";
  document.getElementById("P2HitDice").value = "";
  document.getElementById("P2DamageDice").value = "";
}

/**
 * Prints all current inputs to the console.
 * @param {None}
 */
function printAllInputs(){
  console.log("Print all inputs");
  let userInputs = getInputs();
  console.log(userInputs);
}

/**
 * Creates a bar chart with set information at the given canvas id.
 * @param {String}
 */
function initializeBarChart(canvasId){
  console.log("Initializng Bar: "+canvasId);
  let ctx = document.getElementById(canvasId);
  let labels = months.slice(0,7);
  let data = {
    labels: labels,
    datasets: [{
      label: "My First Dataset",
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(255, 205, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(201, 203, 207, 0.2)"
      ],
      borderColor: [
        "rgb(255, 99, 132)",
        "rgb(255, 159, 64)",
        "rgb(255, 205, 86)",
        "rgb(75, 192, 192)",
        "rgb(54, 162, 235)",
        "rgb(153, 102, 255)",
        "rgb(201, 203, 207)"
      ],
      borderWidth: 1
    }]
  };

  new Chart(ctx, {
    type: "bar",
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

/**
 * Creates a pie chart with set information at the given canvas id.
 * @param {String}
 */
function initializePieChart(canvasId){
  console.log("Initializng Pie: "+canvasId);
  let ctx = document.getElementById(canvasId);
  let data = {
    labels: [
      "Red",
      "Blue",
      "Yellow"
    ],
    datasets: [{
      label: "My First Dataset",
      data: [300, 50, 100],
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)"
      ],
      hoverOffset: 4
    }]
  };

  new Chart(ctx, {
    type: "pie",
    data: data,
  });
}

// Function execution
/**
 * Waits until all content is loaded before initializing the three charts.
 */
document.addEventListener("DOMContentLoaded", function() {
  initializeBarChart("player1Chart");
  initializePieChart("oddsPieChart");
  initializeBarChart("player2Chart");
});