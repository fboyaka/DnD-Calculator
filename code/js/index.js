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

let p1Chart = "";
//const p1Context = document.getElementById("player1Chart").getContext("2d");
let p2Chart = "";
//const p2Context = document.getElementById("player2Chart").getContext("2d");
let pieChart = "";

// Funtions
/**
 * Returns the current values of all text input fields.
 * @param None
 * @return {Set}
 */
function getInputs(){
  console.log("getInputs");
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
  return allInputs;
}

/**
 * Removes all current values for text input fields.
 * @param {None}
 */
function clearAllInputs(){
  console.log("clearAllInputs");
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
  console.log("printAllInputs");
  let userInputs = getInputs();
  console.log(userInputs);
}

/**
 * Applies the reduce function for eve
 * Format: [[1,2,3],[1,2,3]]
 * Result: [6,6]
 * @param {item, index, arr}
 */
function applyReduce(item, index, arr) {
  console.log("applyReduce");
  arr[index] = item.reduce((partialSum, a) => partialSum + a, 0);
}

/**
 * Returns a single list (flattened cartesian product) when given a list of lists
 * Format: [[1,2,3],[1,2,3]]
 * Result: [2,3,4,3,4,5,4,5,6]
 * @param {String}
 */
function cartesian(multiLists){
  console.log("cartesian");
  let resultsList = [];
  
  // cartesian product
  for(let i = 0; i < multiLists.length; i++){
    if(i == 0){resultsList = multiLists[0]}
    else{
      resultsList = math.setCartesian(resultsList, multiLists[i]);
      resultsList.forEach(applyReduce);
    }
  }
  return resultsList;
}



/**
 * Returns an array of 1 to N when given a value
 * Format: 3
 * Result: [1,2,3]
 * @param {Int}
 */
function createArray(val){
  return Array.from({length: val}, (_, i) => i + 1);
}

/**
 * Creates a list of all possible outcomes when given a user input die string.
 * Format: 2d3
 * Result: [[1,2,3],[1,2,3]]
 * @param {String}
 */
function getDieValues(dieString){
  console.log("getDieValues: "+dieString);
  let resultsList = [];
  let dieStringSplit = dieString.split("d");
  if(dieStringSplit.length == 1){return [parseInt(dieStringSplit[0])];}

  let die = dieStringSplit[1];
  let times = dieStringSplit[0];
  console.log("Die: "+die);
  console.log("Times: "+times);
  for(let i = 0; i < times; i++){
    resultsList.push(createArray(die));
  }
  resultsList = cartesian(resultsList);
  return resultsList;
}



/**
 * Processes multiple die strings.
 * Format: ["2d3","1d4"]
 * Result: [[1,2,3],[1,2,3]]
 * @param {String}
 */
function getMultipleDieValues(item, index, arr){
  console.log("getMultipleDieValues: Index="+index);
  arr[index] = getDieValues(item);
}

/**
 * Creates a list of all possible outcomes when given a user input die string.
 * Format: 2d3+1
 * Result: [4, 5, 6, 5, 6, 7, 6, 7, 8]
 * @param {String}
 */
function processDieString(dieString){
  console.log("ProcessDieString: "+dieString);
  let allResultsList = [];
  if(typeof(dieString) == "string" && dieString.length == 0){return allResultsList;}
  // Remove any outlying formatting such as spaces
  dieString = dieString.replaceAll(" ","");
  let dieStringSplit = dieString.split("+");
  dieStringSplit.forEach(getMultipleDieValues);
  dieStringSplit = cartesian(dieStringSplit);
  return dieStringSplit;
}

/**
 * Creates a bar chart with set information at the given canvas id.
 * @param {String}
 */
function initializeBarChart(canvasId){
  console.log("Initializng Bar: "+canvasId);
  let ctx = "";
  if(canvasId == "P1"){ctx = "player1Chart";}
  if(canvasId == "P2"){ctx = "player2Chart";}
  if(ctx == ""){return "";}
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
  if(canvasId == "P1"){
  p1Chart = new Chart(ctx, {
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

  if(canvasId == "P2"){
  p2Chart = new Chart(ctx, {
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
}

/**
 * Creates a pie chart with set information at the given canvas id.
 * @param {String}
 */
function initializePieChart(canvasId){
  console.log("initializePieChart: "+canvasId);
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
  
  let initialChart = new Chart(ctx, {
    type: "pie",
    data: data,
  });
}

/**
 * Takes a 1D array and returns a 2D array where the first row is the values
 * and the second row is the count
 * @param {array}
 */
function countValues(inputData){
  console.log("countValues");
  let valueCount = [[],[]];

  const map = inputData.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
  valueCount[0] = [...map.keys()];
  valueCount[1] = [...map.values()];
  return valueCount;
}

/**
 * Takes a 1D array and returns a 2D array where the first row is the values
 * and the second row is the count
 * @param {chart}
 */
function removeData(chart) {
  console.log("removeData");
  chart.data.labels.pop();
  chart.data.datasets.forEach((dataset) => {
      dataset.data.pop();
  });
  chart.update();
}

/**
 * Updates the given graph with a given string of data
 * @param {array}
 */
function displayGraph(chart,inputData,canvasId){
  console.log("displayP1Graph");
  
  //https://leimao.github.io/blog/JavaScript-ChartJS-Histogram/
  let allVals = countValues(inputData);
  let x_vals = allVals[0];
  let y_vals = allVals[1];
  let data = x_vals.map((k, i) => ({x: k, y: y_vals[i]}));
  let backgroundColor = Array(x_vals.length).fill("rgba(255, 99, 132, 0.2)");
  let borderColor = Array(x_vals.length).fill("rgba(255, 99, 132, 1)");

  chart.destroy();
  chart = new Chart(canvasId, {
      type: "bar",
      data: {
          datasets: [{
              label: "Num of Visitors",
              data: data,
              backgroundColor: backgroundColor,
              borderColor: borderColor,
              borderWidth: 1,
              barPercentage: 1,
              categoryPercentage: 1,
              borderRadius: 5,
          }]
      },
      options: {
          scales: {
              x: {
                  type: "linear",
                  offset: false,
                  grid: {
                    offset: false
                  },
                  ticks: {
                    stepSize: 1
                  },
                  title: {
                    display: true,
                    text: "Hours",
                    font: {
                        size: 14
                    }
                  }
              }, 
              y: {
                  // beginAtZero: true
                  title: {
                    display: true,
                    text: "Visitors",
                    font: {
                        size: 14
                    }
                  }
              }
          },
          plugins: {
            legend: {
                display: false,
              },
            tooltip: {
              callbacks: {
                title: (items) => {
                  if (!items.length) {
                    return "";
                  }
                  const item = items[0];
                  const x = item.parsed.x;
                  const min = x - 0.5;
                  const max = x + 0.5;
                  return `Hours: ${min} - ${max}`;
                }
              }
            }
          }
      }
  });
}

/**
 * Returns false when the string contains a value other than numbers, a plus(+), or the lowercase letter d.
 * @param {string}
 */
function validateString(inputString){
  let temp = /[^0-9d +]/g.test(inputString);
  return temp;
}

/**
 * Returns false when the string is not a single number or contains any non numeric values.
 * @param {string}
 */
function validateInteger(inputString){
  let temp = /[^0-9]/g.test(inputString);
  return temp;
}

/**
 * Creates an alert and returns false when any input is invalid.
 * Returns true when all inputs are valid.
 * @param {array}
 */
function validateInputs(allInputs){
  let invalidFields = [];

  // Integer verification
  try{
    // P1Health
    if(validateInteger(allInputs["P1Health"])){ invalidFields.push('Player 1 Health'); }
  }
  catch{
    invalidFields.push('Player 1 Health');
  }
  try{
    // P1Ac
    if(validateInteger(allInputs["P1Ac"])){ invalidFields.push('Player 1 AC'); }
  }
  catch{
    invalidFields.push('Player 1 AC');
  }
  try{
    // P2Health
    if(validateInteger(allInputs["P2Health"])){ invalidFields.push('Player 2 Health'); }
  }
  catch{
    invalidFields.push('Player 2 Health');
  }
  try{
    // P2Ac
    if(validateInteger(allInputs["P2Ac"])){ invalidFields.push('Player 2 AC'); }
  }
  catch{
    invalidFields.push('Player 2 AC');
  }

  let temp = "";
  // String verification
  try{
    // P1HitDice
    if(validateString(allInputs["P1HitDice"])){ invalidFields.push('Player 1 Hit Dice'); }
  }
  catch{
    invalidFields.push('Player 1 Hit Dice');
  }
  try{
    // P1DamageDice
    if(validateString(allInputs["P1DamageDice"])){ invalidFields.push('Player 1 Damage Dice'); }
  }
  catch{
    invalidFields.push('Player 1 Damage Dice');
  }
  try{
    // P2HitDice
    if(validateString(allInputs["P2HitDice"])){ invalidFields.push('Player 2 Hit Dice'); }
  }
  catch{
    invalidFields.push('Player 2 Hit Dice');
  }
  try{
    // P2DamageDice
    if(validateString(allInputs["P2DamageDice"])){ invalidFields.push('Player 2 Damage Dice'); }
  }
  catch{
    invalidFields.push('Player 2 Damage Dice');
  }

  if(invalidFields.length > 0){
    invalidFields = invalidFields.join("\n");
    alert("The following inputs are invalid:\n"+invalidFields);
    return false;
  } else{
    return true;
  }
}

// Function execution
function processAllInputs(){
  console.log("processAllInputs");
  let allInputs = getInputs();

  let valid = validateInputs(allInputs);
  if(valid){

    let p1Process = processDieString(allInputs["P1HitDice"]);
    console.log("Process Result1:");
    console.log(p1Process.length);
    displayGraph(p1Chart,p1Process,"player1Chart");

    let p2Process = processDieString(allInputs["P2HitDice"]);
    console.log("Process Result2:");
    console.log(p2Process.length);
    displayGraph(p2Chart,p2Process,"player2Chart");

    // Getting the result of damage dice
    let p1Damage = processDieString(allInputs["P1DamageDice"]);
    let p1Sum = p1Damage.reduce((acc, curr) => acc + curr, 0);
    let p1Average = p1Sum / p1Damage.length;
    console.log("P1Average: "+p1Average);
    document.getElementById("p1DPS").innerHTML = p1Average;

    let p2Damage = processDieString(allInputs["P2DamageDice"]);
    let p2Sum = p2Damage.reduce((acc, curr) => acc + curr, 0);
    let p2Average = p2Sum / p2Damage.length;
    console.log("P1Average: "+p2Average);
    document.getElementById("p2DPS").innerHTML = p2Average;
  }
  else{console.log("Booooooo!");}
}

/**
 * Waits until all content is loaded before initializing the three charts.
 */
document.addEventListener("DOMContentLoaded", function() {
  initializeBarChart("P1");
  initializePieChart("oddsPieChart");
  initializeBarChart("P2");
});