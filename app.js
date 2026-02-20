let multiplier = 1.00;
let interval;
let crashed = false;

document.getElementById("startBtn").addEventListener("click", startGame);

function startGame(){

  multiplier = 1.00;
  crashed = false;
  document.getElementById("multiplier").innerText = "1.00x";
  document.getElementById("plane").style.left = "10px";
  document.getElementById("plane").style.bottom = "20px";

  let crashPoint = (Math.random() * 5 + 1);

  interval = setInterval(() => {

    multiplier += 0.05;
    document.getElementById("multiplier").innerText = multiplier.toFixed(2) + "x";

    let plane = document.getElementById("plane");
    plane.style.left = (multiplier * 15) + "px";
    plane.style.bottom = (multiplier * 10) + "px";

    if(multiplier >= crashPoint && !crashed){
      clearInterval(interval);
      crashed = true;
      document.getElementById("multiplier").innerText = "CRASH 💥";
      document.getElementById("multiplier").style.color = "#ff0000";
    }

  },100);

}
