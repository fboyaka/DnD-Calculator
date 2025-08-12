// index.js

function getInputs(){
  var allInputs = {
    "P1Health" : document.getElementById('P1HP').value,
    "P1Ac" : document.getElementById('P1AC').value,
    "P1HitDice" : document.getElementById('P1HitDice').value,
    "P1DamageDice" : document.getElementById('P1DamageDice').value,
    "P2Health" : document.getElementById('P2HP').value,
    "P2Ac" : document.getElementById('P2AC').value,
    "P2HitDice" : document.getElementById('P2HitDice').value,
    "P2DamageDice" : document.getElementById('P2DamageDice').value
  };
  return allInputs;
}

function clearAllInputs(){
  console.log("Clear all inputs");
  document.getElementById('P1HP').value = "";
  document.getElementById('P1AC').value = "";
  document.getElementById('P1HitDice').value = "";
  document.getElementById('P1DamageDice').value = "";
  document.getElementById('P2HP').value = "";
  document.getElementById('P2AC').value = "";
  document.getElementById('P2HitDice').value = "";
  document.getElementById('P2DamageDice').value = "";
}

function printAllInputs(){
  console.log("Print all inputs");
  let userInputs = getInputs();
  console.log(userInputs);
}


function initializeBarChart(canvasId){
  
}