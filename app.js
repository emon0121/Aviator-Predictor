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
const modal = document.getElementById("modal");
const userForm = document.getElementById("userForm");
const animation = document.getElementById("animation");
const closeModal = document.querySelectorAll(".close");

const signalSection = document.getElementById("signalSection");
const signalDisplay = document.getElementById("signalDisplay");
const buyNowBtn = document.getElementById("buyNowBtn");
const plane = document.getElementById("plane");
const multiplierCanvas = document.getElementById("multiplierCanvas");
const ctx = multiplierCanvas.getContext("2d");

const paymentModal = document.getElementById("paymentModal");
const submitPayment = document.getElementById("submitPayment");
const txidInput = document.getElementById("txid");

// First Visit check
let isFirstVisit = !localStorage.getItem("visited");

// Open Signal Modal
signalBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
    animation.style.display = "block";
    userForm.classList.add("hidden");
    setTimeout(() => {
        animation.style.display = "none";
        userForm.classList.remove("hidden");
    }, 2000);
});

// Close Modals
closeModal.forEach(btn => {
    btn.addEventListener("click", () => {
        modal.classList.add("hidden");
        paymentModal.classList.add("hidden");
    });
});

// Animate multiplier
function animateMultiplier(finalSignal) {
    let width = multiplierCanvas.width;
    let height = multiplierCanvas.height;
    let multiplier = 1.0;
    let step = 0.02;
    let points = [];

    function draw() {
        ctx.clearRect(0,0,width,height);
        ctx.fillStyle = "#00ff00";
        ctx.beginPath();
        ctx.moveTo(0,height);
        points.push(multiplier);
        if(points.length > width) points.shift();
        points.forEach((m,i) => {
            ctx.lineTo(i,height - (m/6)*height);
        });
        ctx.lineTo(points.length-1,height);
        ctx.closePath();
        ctx.fill();
        multiplier += step;
        if(multiplier >= finalSignal) multiplier = finalSignal;
        if(multiplier < finalSignal) requestAnimationFrame(draw);
    }
    draw();
}

// User Form submit
userForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const site = document.getElementById("siteName").value;
    const username = document.getElementById("username").value;

    modal.classList.add("hidden");
    signalSection.classList.remove("hidden");

    if(isFirstVisit){
        const signal = (Math.random()*5+1).toFixed(2);
        signalDisplay.textContent = signal;

        // Plane animation
        plane.style.animation = "flyPlane 4s linear forwards";

        // Real-time multiplier
        animateMultiplier(signal);

        localStorage.setItem("visited","true");
    } else {
        buyNowBtn.classList.remove("hidden");
    }
});

// Buy Now Button
buyNowBtn.addEventListener("click", () => {
    paymentModal.classList.remove("hidden");
});

// Submit Payment TXID
submitPayment.addEventListener("click", () => {
    const txid = txidInput.value.trim();
    if(!txid){ alert("Please enter TXID"); return; }

    // Telegram Bot API (replace with real token & chat ID)
    const botToken = "YOUR_BOT_TOKEN";
    const chatId = "ADMIN_CHAT_ID";
    const message = `New Payment Submission:\nTXID: ${txid}\nUser: ${document.getElementById("username").value}\nSite: ${document.getElementById("siteName").value}`;

    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: message })
    }).then(() => {
        alert("Payment submitted! Admin will confirm via Telegram.");
        const checkConfirmation = setInterval(() => {
            if(localStorage.getItem("paymentConfirmed") === "true"){
                clearInterval(checkConfirmation);
                paymentModal.classList.add("hidden");
                signalSection.classList.remove("hidden");
                const signal = (Math.random()*5+1).toFixed(2);
                signalDisplay.textContent = signal;
                plane.style.animation = "flyPlane 4s linear forwards";
                animateMultiplier(signal);
                alert("Payment confirmed! Your signal is now available.");
            }
        }, 2000);
    }).catch(() => { alert("Failed to send TXID to admin."); });
});
