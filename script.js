document.addEventListener("DOMContentLoaded",function(){

// IMAGE SLIDER
let currentSlide=0;
const slides=document.querySelectorAll(".image-slider img");
const dots=document.querySelectorAll(".dot");

function showSlide(i){
slides.forEach(s=>s.classList.remove("active"));
dots.forEach(d=>d.classList.remove("active"));
slides[i].classList.add("active");
dots[i].classList.add("active");
}

setInterval(()=>{
currentSlide=(currentSlide+1)%slides.length;
showSlide(currentSlide);
},3000);

// NAVIGATION
const signalBtn=document.getElementById("signalBtn");
const formSection=document.getElementById("formSection");
const generateSignal=document.getElementById("generateSignal");
const signalSection=document.getElementById("signalSection");
const signalDisplay=document.getElementById("signalDisplay");
const buyNowBtn=document.getElementById("buyNowBtn");

signalBtn.onclick=()=>{
document.getElementById("landing").classList.add("hidden");
formSection.classList.remove("hidden");
};

generateSignal.onclick=()=>{
formSection.classList.add("hidden");
signalSection.classList.remove("hidden");

let signal=(Math.random()*5+1).toFixed(2);
signalDisplay.innerText=signal+"x";

document.getElementById("plane").style.animation="fly 4s linear forwards";

animateChart(signal);

if(localStorage.getItem("used")){
buyNowBtn.classList.remove("hidden");
}else{
localStorage.setItem("used","true");
}
};

// MULTIPLIER GRAPH
function animateChart(finalSignal){
const canvas=document.getElementById("chart");
const ctx=canvas.getContext("2d");
let mult=1;

function draw(){
ctx.clearRect(0,0,canvas.width,canvas.height);
ctx.fillStyle="lime";
ctx.fillRect(0,canvas.height-(mult*20),canvas.width,4);
mult+=0.05;
if(mult<finalSignal)requestAnimationFrame(draw);
}
draw();
}

// PACKAGE & PAYMENT
const packageModal=document.getElementById("packageModal");
const paymentModal=document.getElementById("paymentModal");

buyNowBtn.onclick=()=>packageModal.classList.remove("hidden");
document.getElementById("closePackage").onclick=()=>packageModal.classList.add("hidden");
document.getElementById("closePayment").onclick=()=>paymentModal.classList.add("hidden");

document.querySelectorAll(".package").forEach(pkg=>{
pkg.onclick=()=>{
packageModal.classList.add("hidden");
paymentModal.classList.remove("hidden");
};
});

document.getElementById("submitPayment").onclick=()=>{
alert("Payment Submitted. Admin will confirm manually.");
paymentModal.classList.add("hidden");
};

});
