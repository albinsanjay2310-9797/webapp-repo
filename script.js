// Update these paths to match your image filenames in /assets
const IMAGES = {
    neutral: "assets/face-neutral.jpg",
    smile: "assets/face-smile.jpg",
    angry: "assets/face-angry.jpg",
  };
  
  const face = document.getElementById("face");
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");
  const subtext = document.getElementById("subtext");
  
  const stageQuestion = document.getElementById("stage-question");
  const stageYes = document.getElementById("stage-yes");
  
  const confettiWrap = document.getElementById("confetti");
  const replayBtn = document.getElementById("replayBtn");
  
  // Hover behavior
  yesBtn.addEventListener("mouseenter", () => {
    face.src = IMAGES.smile;
    subtext.textContent = "✅ Good choice detected.";
  });
  
  yesBtn.addEventListener("mouseleave", () => {
    face.src = IMAGES.neutral;
    subtext.textContent = "";
  });
  
  noBtn.addEventListener("mouseenter", () => {
    face.src = IMAGES.angry;
    subtext.textContent = "🚨 Negative input flagged by Romance Firewall.";
  });
  
  noBtn.addEventListener("mouseleave", () => {
    face.src = IMAGES.neutral;
    subtext.textContent = "";
  });
  
  // Make "no" mischievous (still clickable)
  noBtn.addEventListener("mousemove", () => {
    const x = (Math.random() - 0.5) * 10;
    const y = (Math.random() - 0.5) * 10;
    noBtn.style.transform = `translate(${x}px, ${y}px)`;
  });
  
  noBtn.addEventListener("mouseleave", () => {
    noBtn.style.transform = "translate(0,0)";
  });
  
  // Click YES => success + confetti
  yesBtn.addEventListener("click", () => {
    stageQuestion.classList.add("hidden");
    stageYes.classList.remove("hidden");
    burstConfetti(160);
  });
  
  // If she clicks no => convert it into yes
  noBtn.addEventListener("click", () => {
    subtext.textContent = "Nice try 😌 Let’s reconsider that…";
  
    // convert styling + text
    noBtn.textContent = "ok fine… YES ✅";
    noBtn.classList.remove("no");
    noBtn.classList.add("yes");
    noBtn.style.fontSize = "18px";
    noBtn.style.padding = "14px 22px";
    noBtn.style.transform = "translate(0,0)";
  
    // remove wiggle behavior by cloning
    const newBtn = noBtn.cloneNode(true);
    noBtn.parentNode.replaceChild(newBtn, noBtn);
  
    // new hover behavior
    newBtn.addEventListener("mouseenter", () => {
      face.src = IMAGES.smile;
      subtext.textContent = "✅ That’s more like it.";
    });
  
    newBtn.addEventListener("mouseleave", () => {
      face.src = IMAGES.neutral;
      subtext.textContent = "";
    });
  
    // new click behavior (acts like YES)
    newBtn.addEventListener("click", () => {
      stageQuestion.classList.add("hidden");
      stageYes.classList.remove("hidden");
      burstConfetti(160);
    });
  });
  
  replayBtn.addEventListener("click", () => window.location.reload());
  
  // Confetti generator (no libraries)
  function burstConfetti(count = 120) {
    confettiWrap.innerHTML = "";
    const w = window.innerWidth;
  
    for (let i = 0; i < count; i++) {
      const piece = document.createElement("i");
  
      const left = Math.random() * w;
      const sizeW = 6 + Math.random() * 10;
      const sizeH = 10 + Math.random() * 14;
  
      piece.style.left = `${left}px`;
      piece.style.width = `${sizeW}px`;
      piece.style.height = `${sizeH}px`;
      piece.style.animationDelay = `${Math.random() * 350}ms`;
  
      const colors = ["#ff5b77", "#35d07f", "#7aa7ff", "#ffd166", "#c77dff", "#ffffff"];
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
  
      confettiWrap.appendChild(piece);
    }
  
    setTimeout(() => {
      confettiWrap.innerHTML = "";
    }, 1600);
  }
  
