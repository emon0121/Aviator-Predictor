let firstClick = true;

function generateCrash(){

  if(firstClick){

    let crashPoint = (Math.random() * 5 + 1).toFixed(2); 
    document.getElementById("multiplier").innerText = crashPoint + "x";

    document.getElementById("premiumBtn").style.display = "block";
    firstClick = false;

  }else{
    alert("Upgrade to premium to unlock next prediction!");
  }

}
