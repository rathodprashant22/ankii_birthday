const revealItems = document.querySelectorAll('.reveal');
const letter = document.getElementById('letter');
const openLetterBtn = document.getElementById('open-letter');

letter.classList.add('hidden-letter');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.14 }
);

revealItems.forEach((item) => observer.observe(item));

openLetterBtn.addEventListener('click', () => {
  letter.classList.remove('hidden-letter');
  letter.classList.add('visible');
  letter.scrollIntoView({ behavior: 'smooth', block: 'start' });
  openLetterBtn.textContent = 'Your letter is open 💌';
  openLetterBtn.disabled = true;
});

const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function initParticles() {
  particles = Array.from({ length: 65 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.8 + 0.4,
    vx: (Math.random() - 0.5) * 0.25,
    vy: (Math.random() - 0.5) * 0.25,
  }));
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.fill();
  });

  requestAnimationFrame(drawParticles);
}

window.addEventListener('resize', () => {
  resize();
  initParticles();
});

resize();
initParticles();
drawParticles();
