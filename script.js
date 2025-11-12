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

// ===== CARROUSEL ACCUEIL CLIQUABLE =====
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

// ===== CARROUSELS AVANT/APRÈS (GALERIE) =====
document.querySelectorAll('.ba-item').forEach(item => {
  const slides = item.querySelectorAll('.ba-slide');
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

// ===== TIMELINE ANIMATION AU CHARGEMENT =====
const timelineContainer = document.querySelector('.timeline-container');
if (timelineContainer) {
  setTimeout(() => timelineContainer.classList.add('visible'), 100);
  document.querySelectorAll('.timeline-step').forEach((step, i) => {
    setTimeout(() => step.classList.add('show'), 400 + i * 300);
  });
  setTimeout(() => document.querySelector('.timeline-line')?.classList.add('filled'), 1600);
}

// ===== MODAL + CONFETTIS DE MALADE =====
document.addEventListener('DOMContentLoaded', () => {
  const contactNav = document.getElementById('contactNav');
  const modal = document.getElementById('contactModal');
  const closeBtn = modal?.querySelector('.close');
  const sendBtn = document.getElementById('sendMessage');
  const btnText = sendBtn?.querySelector('.btn-text');
  const successText = sendBtn?.querySelector('.success-text');

  if (!contactNav || !modal) return;

  // OUVERTURE MODAL
  contactNav.addEventListener('click', (e) => {
    e.preventDefault();
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('active'), 10);
  });

  // FERMETURE
  const closeModal = () => {
    modal.classList.remove('active');
    setTimeout(() => { modal.style.display = 'none'; }, 400);
  };
  closeBtn?.addEventListener('click', closeModal);
  window.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

  // ENVOI MESSAGE + CONFETTIS
  if (sendBtn) {
    sendBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (sendBtn.disabled) return;
      sendBtn.disabled = true;

      btnText.style.display = 'none';
      successText.style.display = 'inline';
      sendBtn.style.background = '#00ba7c';
      sendBtn.style.boxShadow = '0 0 30px rgba(0,186,124,0.8)';

      // CONFETTIS EXPLOSION
      const confettiContainer = document.createElement('div');
      Object.assign(confettiContainer.style, {
        position: 'fixed', top: '0', left: '0', width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: '9999'
      });
      document.body.appendChild(confettiContainer);

      for (let i = 0; i < 90; i++) {
        const c = document.createElement('div');
        Object.assign(c.style, {
          position: 'absolute',
          width: '12px', height: '12px',
          background: ['#f47c1f', '#ff9a3d', '#00ba7c', '#ffffff'][Math.floor(Math.random() * 4)],
          left: Math.random() * 100 + 'vw',
          top: '-15px',
          borderRadius: Math.random() > 0.5 ? '50%' : '0',
          transform: `rotate(${Math.random() * 360}deg)`
        });
        confettiContainer.appendChild(c);

        c.animate([
          { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
          { transform: `translateY(100vh) rotate(${Math.random() * 720}deg)`, opacity: 0 }
        ], {
          duration: 2200 + Math.random() * 1800,
          easing: 'cubic-bezier(0.1, 0.1, 0.2, 1)',
          delay: Math.random() * 400
        }).onfinish = () => c.remove();
      }

      // Fermeture auto après explosion
      setTimeout(() => {
        modal.classList.remove('active');
        setTimeout(() => {
          modal.style.display = 'none';
          document.body.removeChild(confettiContainer);
          sendBtn.disabled = false;
          btnText.style.display = 'inline';
          successText.style.display = 'none';
          sendBtn.style.background = '';
          sendBtn.style.boxShadow = '';
        }, 500);
      }, 2500);
    });
  }
});