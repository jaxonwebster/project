/* =========================
   MENU
========================= */
const menuBtn = document.getElementById("menuBtn");
const sideMenu = document.getElementById("sideMenu");
const closeMenu = document.getElementById("closeMenu");
const overlay = document.querySelector(".overlay");

if (menuBtn && sideMenu && closeMenu) {
  menuBtn.addEventListener("click", () => {
    sideMenu.classList.add("open");
    if (overlay) overlay.classList.add("show");
  });

  closeMenu.addEventListener("click", () => {
    sideMenu.classList.remove("open");
    if (overlay) overlay.classList.remove("show");
  });

  if (overlay) {
    overlay.addEventListener("click", () => {
      sideMenu.classList.remove("open");
      overlay.classList.remove("show");
    });
  }
}


/* =========================
   TYPEWRITER
========================= */
const typeTarget = document.getElementById("typewriter");

if (typeTarget) {
  const text = "Hi, I'm Jaxon Webster";
  let typeIndex = 0;

  function typeWriter() {
    if (typeIndex < text.length) {
      typeTarget.textContent += text.charAt(typeIndex);
      typeIndex++;
      setTimeout(typeWriter, 80);
    }
  }

  typeWriter();
}

/* =========================
   ROTATING WORDS
========================= */
const rotatingWord = document.getElementById("rotating-word");

if (rotatingWord) {
  const words = [
    "web experiences",
    "secure applications",
    "trustworthy software",
    "clean UI",
    "solutions"
  ];

  let rotateIndex = 0;
  rotatingWord.textContent = words[rotateIndex];

  setInterval(() => {
    rotatingWord.style.opacity = 0;
    rotatingWord.style.transform = "translateY(6px)";

    setTimeout(() => {
      rotateIndex = (rotateIndex + 1) % words.length;
      rotatingWord.textContent = words[rotateIndex];
      rotatingWord.style.opacity = 1;
      rotatingWord.style.transform = "translateY(0)";
    }, 300);
  }, 1600);
}

/* =========================
   PROJECT CARD REVEAL
========================= */
const projectCards = document.querySelectorAll(".project-card");

if (projectCards.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  projectCards.forEach((card) => observer.observe(card));
}

/* =========================
   BACKGROUND CANVAS (DATA PULSES)
========================= */
const canvas = document.getElementById("signalCanvas");

if (canvas) {
  const ctx = canvas.getContext("2d");
  let w, h;

  const lines = [];
  const pulses = [];
  const LINE_COUNT = 45;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resize);
  resize();

  class Line {
    constructor() {
      this.reset();
    }

    reset() {
      this.x1 = Math.random() * w;
      this.y1 = Math.random() * h;
      const angle = Math.random() * Math.PI * 2;
      const length = 120 + Math.random() * 220;
      this.x2 = this.x1 + Math.cos(angle) * length;
      this.y2 = this.y1 + Math.sin(angle) * length;
    }

    draw() {
      ctx.beginPath();
      ctx.moveTo(this.x1, this.y1);
      ctx.lineTo(this.x2, this.y2);
      ctx.strokeStyle = "rgba(107, 92, 255, 0.08)";
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }

  class Pulse {
    constructor(line) {
      this.line = line;
      this.t = 0;
      this.speed = 0.0012 + Math.random() * 0.0018;
    }

    update() {
      this.t += this.speed;
    }

    draw() {
      const x = this.line.x1 + (this.line.x2 - this.line.x1) * this.t;
      const y = this.line.y1 + (this.line.y2 - this.line.y1) * this.t;

      ctx.beginPath();
      ctx.arc(x, y, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = "#8E7332";
      ctx.shadowBlur = 10;
      ctx.shadowColor = "#bcb1f4";
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  for (let i = 0; i < LINE_COUNT; i++) {
    lines.push(new Line());
  }

  function animate() {
    ctx.clearRect(0, 0, w, h);

    lines.forEach((line) => line.draw());

    if (Math.random() < 0.035) {
      pulses.push(new Pulse(lines[Math.floor(Math.random() * lines.length)]));
    }

    for (let i = pulses.length - 1; i >= 0; i--) {
      pulses[i].update();
      pulses[i].draw();
      if (pulses[i].t >= 1) pulses.splice(i, 1);
    }

    requestAnimationFrame(animate);
  }

  animate();
}

document.querySelectorAll(".carousel").forEach(carousel => {
  const images = carousel.querySelectorAll("img");
  const prev = carousel.querySelector(".prev");
  const next = carousel.querySelector(".next");

  let index = 0;

  function showImage(i) {
    images.forEach(img => img.classList.remove("active"));
    images[i].classList.add("active");
  }

  prev.addEventListener("click", () => {
    index = (index - 1 + images.length) % images.length;
    showImage(index);
  });

  next.addEventListener("click", () => {
    index = (index + 1) % images.length;
    showImage(index);
  });

  showImage(index);
});
