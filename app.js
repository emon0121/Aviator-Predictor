// Banner Slider
let current = 0;
const banners = document.querySelectorAll(".banner-slider img");
setInterval(() => {
    banners[current].classList.remove("active");
    current = (current + 1) % banners.length;
    banners[current].classList.add("active");
}, 3000);

// DOM Elements
const signalBtn = document.getElementById("signalBtn");
const landing = document.getElementById("landing");
const formSection = document.getElementById("formSection");
const animation = document.getElementById("animation");
const userForm = document.getElementById("userForm");
const signalSection = document.getElementById("signalSection");
const signalDisplay = document.getElementById("signalDisplay");
const buyNowBtn = document.getElementById("buyNowBtn");
const paymentSection = document.getElementById("paymentSection");
const submitPayment = document.getElementById("submitPayment");
const txidInput = document.getElementById("txid");

// LocalStorage for first visit
let isFirstVisit = !localStorage.getItem("visited");

// Signal Now Button
signalBtn.addEventListener("click", () => {
    landing.classList.add("hidden");
    formSection.classList.remove("hidden");
    animation.style.display = "block";
    setTimeout(() => {
        animation.style.display = "none";
        userForm.classList.remove("hidden");
    }, 2000);
});

// Form submit
userForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const site = document.getElementById("siteName").value;
    const username = document.getElementById("username").value;

    formSection.classList.add("hidden");
    signalSection.classList.remove("hidden");

    if(isFirstVisit){
        const signal = (Math.random()*5+1).toFixed(2);
        signalDisplay.textContent = signal;
        localStorage.setItem("visited","true");
    } else {
        buyNowBtn.classList.remove("hidden");
    }
});

// Buy Now Button
buyNowBtn.addEventListener("click", () => {
    signalSection.classList.add("hidden");
    paymentSection.classList.remove("hidden");
});

// Submit Payment (TXID)
submitPayment.addEventListener("click", () => {
    const txid = txidInput.value.trim();
    if(!txid){
        alert("Please enter your TXID");
        return;
    }

    // Telegram Bot API (Replace with your bot token & admin chat ID)
    const botToken = "YOUR_BOT_TOKEN";
    const chatId = "ADMIN_CHAT_ID";
    const message = `New Payment Submission:\nTXID: ${txid}\nUser: ${document.getElementById("username").value}\nSite: ${document.getElementById("siteName").value}`;

    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: message })
    }).then(() => {
        alert("Payment submitted! Admin will confirm via Telegram.");
        // Wait for admin confirmation (simulate)
        const checkConfirmation = setInterval(() => {
            if(localStorage.getItem("paymentConfirmed") === "true"){
                clearInterval(checkConfirmation);
                paymentSection.classList.add("hidden");
                signalSection.classList.remove("hidden");
                signalDisplay.textContent = (Math.random()*5+1).toFixed(2);
                alert("Payment confirmed! Your signal is now available.");
            }
        }, 2000);
    }).catch(() => {
        alert("Failed to send TXID to admin.");
    });
});
