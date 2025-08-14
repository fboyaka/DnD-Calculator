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

const p1Chart = document.getElementById("player1Chart");
const p2Chart = document.getElementById("player2Chart");

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
  console.log("cartesian function");
  let resultsList = [];
  
  // cartesian product
  for(let i = 0; i < multiLists.length; i++){
    if(i == 0){resultsList = multiLists[0]}
    else{
      resultsList = math.setCartesian(resultsList, multiLists[i]);
      // console.log("Before reduction:");
      // console.log(resultsList);
      resultsList.forEach(applyReduce);
      // console.log("After reduction:");
      // console.log(resultsList);
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
  console.log("Pre-cartesian list:");
  console.log(resultsList);
  resultsList = cartesian(resultsList);
  console.log("Post-cartesian list:");
  console.log(resultsList);
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
  console.log("dieStringSplit:");
  console.log(dieStringSplit);

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
  let valueCount = [[],[]];

  const map = inputData.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
  valueCount[0] = [...map.keys()];
  valueCount[1] = [...map.values()];
  return valueCount;
}

/**
 * Updates the P1 side graph with a given string of data
 * @param {array}
 */
function displayP1Graph(inputData){
  console.log("displayP1Graph");
  let ctx = document.getElementById("player1Chart");
  //https://leimao.github.io/blog/JavaScript-ChartJS-Histogram/
  let allVals = countValues(inputData);
  const x_vals = allVals[0];
  const y_vals = allVals[1];
  const data = x_vals.map((k, i) => ({x: k, y: y_vals[i]}));

  const backgroundColor = Array(x_vals.length).fill("rgba(255, 99, 132, 0.2)");
  const borderColor = Array(x_vals.length).fill("rgba(255, 99, 132, 1)");

  const myChart = new Chart(ctx, {
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

// Function execution
function processAllInputs(){
  console.log("processAllInputs");
  
  // let dieString = "6d2+1d4 + 1";
  // let processResult = processDieString(dieString);
  // console.log("Process Result:");
  // console.log(processResult);
  // displayP1Graph(processResult);
  // let counts = countValues(processResult);
  // console.log(counts);
  // displayP1Graph();
  // let dieVals = getDieValues("2d3");
  // console.log("getDieValues(one value):");
  // console.log(dieVals);
  // dieVals = getMultipleDieValues(["2d3","1d4"]);
  // console.log("getDieValues(many values):");
  // console.log(dieVals);
  // let cartesianResult = cartesian(cartList);
  // console.log("Cartesian Result:");
  // console.log(cartesianResult);
  // let tempArr = math.setCartesian([1, 2], [3, 4]);
  // console.log(tempArr);

  // cartList.forEach(applyReduce);
  // console.log(cartList);
}

/**
 * Waits until all content is loaded before initializing the three charts.
 */
document.addEventListener("DOMContentLoaded", function() {
  initializeBarChart("player1Chart");
  initializePieChart("oddsPieChart");
  initializeBarChart("player2Chart");
});