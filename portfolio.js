// =====================
// PARTICLES ANIMATION
// =====================
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];

function resize() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
resize();

class Particle {
  constructor() { 
    this.reset(); 
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1.5 + 0.3;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = (Math.random() - 0.5) * 0.3;
    this.opacity = Math.random() * 0.5 + 0.1;
    const colors = ['rgba(167,139,250,', 'rgba(52,211,153,', 'rgba(244,114,182,'];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) 
      this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color + this.opacity + ')';
    ctx.fill();
  }
}

for (let i = 0; i < 80; i++) particles.push(new Particle());

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animate);
}
animate();
window.addEventListener('resize', resize);

// =====================
// PORTFOLIO FILTERING
// =====================
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const selectedCategory = btn.getAttribute('data-category');

    // Filter projects
    projectCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      
      if (selectedCategory === 'all' || cardCategory === selectedCategory) {
        card.classList.remove('hidden');
        // Trigger animation
        card.style.animation = 'none';
        setTimeout(() => {
          card.style.animation = 'fadeInScale 0.5s ease';
        }, 10);
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// =====================
// SMOOTH SCROLL & FADE-IN
// =====================
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.08 });

// Observe portfolio cards for animation
projectCards.forEach(card => observer.observe(card));
