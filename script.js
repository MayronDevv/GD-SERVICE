// ===== MENU BURGER =====
const burger = document.getElementById("burger");
const navMenu = document.getElementById("nav-menu");

burger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  burger.classList.toggle("open");
});

// ===== ÉTOILES FILANTES =====
const starsContainer = document.getElementById("shooting-stars");

function createStar() {
  const star = document.createElement("div");
  star.classList.add("shooting-star");

  const startY = Math.random() * 35;
  const startX = Math.random() * 75 + 12;
  const size = 70 + Math.random() * 70;
  const duration = 1.3 + Math.random() * 1.3;

  star.style.top = startY + "%";
  star.style.left = startX + "%";
  star.style.width = size + "px";
  star.style.animationDuration = duration + "s";

  starsContainer.appendChild(star);

  setTimeout(() => star.classList.add("active"), 50 + Math.random() * 250);
  setTimeout(() => star.remove(), duration * 1000 + 600);
}

setInterval(createStar, 320);

// ===== CARROUSEL CLIQUABLE (ACCUEIL) =====
const dots = document.querySelectorAll('.dot');
const carouselInner = document.querySelector('.carousel-inner');

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    carouselInner.style.transform = `translateX(-${index * 100}%)`;
    document.querySelector('.dot.active')?.classList.remove('active');
    dot.classList.add('active');
    carouselInner.style.animation = 'none';
    setTimeout(() => {
      carouselInner.style.animation = 'carouselSlide 12s infinite';
    }, 10);
  });
});

// ===== TOUS LES CARROUSELS AVANT/APRÈS (GALERIE) =====
document.querySelectorAll('.ba-item').forEach(item => {
  const carousel = item.querySelector('.before-after-carousel');
  const slides = carousel.querySelectorAll('.ba-slide');
  const dots = item.querySelectorAll('.ba-dot');
  let current = 0;

  function showSlide(n) {
    slides.forEach((s, i) => s.classList.toggle('active', i === n));
    dots.forEach((d, i) => d.classList.toggle('active', i === n));
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      current = i;
      showSlide(current);
    });
  });

  setInterval(() => {
    current = (current + 1) % slides.length;
    showSlide(current);
  }, 5000);
});

// ===== ANIMATION TIMELINE AU SCROLL (ACCUEIL) =====
const timelineContainer = document.querySelector('.timeline-container');
const steps = document.querySelectorAll('.timeline-step');
const line = document.querySelector('.timeline-line');

if (timelineContainer) {
  // Animation au chargement
  setTimeout(() => timelineContainer.classList.add('visible'), 100);
  steps.forEach((step, i) => {
    setTimeout(() => step.classList.add('show'), 400 + i * 300);
  });
  setTimeout(() => line.classList.add('filled'), 400 + steps.length * 300);
}

// ===== MODAL CONTACT - UNE SEULE FOIS, TOUTES PAGES =====
document.addEventListener('DOMContentLoaded', () => {
  const contactNav = document.getElementById('contactNav');
  const modal = document.getElementById('contactModal');
  const closeBtn = modal?.querySelector('.close');

  if (contactNav && modal) {
    contactNav.addEventListener('click', (e) => {
      e.preventDefault();
      modal.style.display = 'block';
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
});

