




const firebaseConfig = {
    apiKey: "AIzaSyAIVy9iBeJB58galZfK2gYmjKYqBshVcBc",
    authDomain: "teto-clicker.firebaseapp.com",
    databaseURL: "https://teto-clicker-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "teto-clicker",
    storageBucket: "teto-clicker.firebasestorage.app",
    messagingSenderId: "162094409222",
    appId: "1:162094409222:web:5622b430acee77e2800587"
};
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const reset = document.getElementById("reset");
const scoreText = document.getElementById("scoreText");
let score = parseInt(localStorage.getItem("score")) || 0;
scoreText.textContent = score;
const video = document.getElementById("bgVideo");
const btn = document.getElementById("toggleSound");
const shopToggle = document.getElementById("shopToggle");
const shopPanel = document.getElementById("shopPanel");
const toggleSetting = document.getElementById("setting");
const setpat = document.getElementById("setPanel");
const resetpop = document.getElementById("resetPop");

        

toggleSetting.addEventListener("click", () => {
    if(!setpat.classList.contains("open")) {
        setpat.classList.remove("close");
        setpat.classList.add("open");
    } else {
        setpat.classList.remove("open");
        setpat.classList.add("close");
    }
    toggleSetting.textContent = setpat.classList.contains("open") ? "x" : "⚙" ;
});

shopToggle.addEventListener("click", () => {
    shopPanel.classList.toggle("open");
    shopToggle.classList.toggle("open");

    shopToggle.textContent = shopPanel.classList.contains("open") ? "<" : ">" ;


});

btn.addEventListener("click", () => {
    if (video.muted) {
        video.muted = false;
        video.volume = 1.0;
        btn.textContent = "🔇 Mute";
    } else {
        video.muted = true;
        btn.textContent = "🔊 Unmute";
    }

});
document.addEventListener("click", () => {
    const sound = document.getElementById("sfx1").cloneNode(true);
    sound.play();
});

document.addEventListener("click", (e) => {
    if (e.target.closest("#reset")) return;
    const img = document.createElement("img");
    img.src = "teto2.png";       
    img.className = "teto-img";
    img.style.left = e.pageX - 40 + "px"; 
    img.style.top = e.pageY - 40 + "px";
    score++;
    scoreText.textContent = score;
    localStorage.setItem("score", score);

    document.body.appendChild(img);
    firebase.database().ref("leaderboard/" + "player1").set({
        score: score
    });

    // Remove after animation finishes
    setTimeout(() => {
        img.remove();
    }, 600); // matches animation duration
});
    
reset.addEventListener("click", (e) => {
    e.stopPropagation();
    resetpop.classList.remove("hide");
});
document.getElementById("yes").addEventListener("click", (e) => {
    e.stopPropagation();
    score = 0;
    scoreText.textContent = 0;
    localStorage.setItem("score", 0);
    resetpop.classList.add("hide");

});
document.getElementById("no").addEventListener("click", (e) => {
    e.stopPropagation();
    resetpop.classList.add("hide");
});