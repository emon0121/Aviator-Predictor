let used = false;
let premium = localStorage.getItem("premium");

const signals = [
  "1.45x",
  "2.10x",
  "3.25x",
  "1.80x",
  "4.00x",
  "2.75x"
];

if(premium === "true"){
  setPremiumUI();
}

document.getElementById("signalBtn").addEventListener("click", function(){

  if(!used || premium === "true"){

    let randomSignal = signals[Math.floor(Math.random()*signals.length)];
    document.getElementById("multiplier").innerText = randomSignal;

    let plane = document.querySelector(".plane");
    plane.style.left = "260px";
    plane.style.bottom = "180px";

    used = true;

  }else{
    document.getElementById("buyBtn").style.display = "block";
  }

});

document.getElementById("buyBtn").addEventListener("click", function(){
  document.getElementById("paymentBox").style.display = "block";
});

function submitPayment(){

  let trx = document.getElementById("trxId").value;

  if(trx == ""){
    alert("Enter Transaction ID");
    return;
  }

  let user = Telegram.WebApp.initDataUnsafe?.user;

  let message = `
NEW PAYMENT REQUEST
User: ${user?.first_name || "Unknown"}
Username: @${user?.username || "N/A"}
User ID: ${user?.id || "N/A"}
TRX ID: ${trx}
  `;

  fetch("https://api.telegram.org/botYOUR_BOT_TOKEN/sendMessage",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body: JSON.stringify({
      chat_id: "YOUR_TELEGRAM_ID",
      text: message
    })
  });

  alert("Payment submitted. Wait for verification.");
}

function unlockPremium(){

  let code = document.getElementById("premiumCode").value;

  if(code === "PREMIUM123"){   // আপনি code পরিবর্তন করবেন
    localStorage.setItem("premium","true");
    setPremiumUI();
    alert("Premium Activated!");
  }else{
    alert("Invalid Code");
  }

}

function setPremiumUI(){
  document.getElementById("statusText").innerText = "Premium User";
  document.getElementById("statusText").style.color = "#FFD700";
  document.getElementById("buyBtn").style.display = "none";
}
