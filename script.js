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

// ===== MODAL =====
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

// ENVOI MESSAGE - VERSION PROFESSIONNELLE + VALIDATION
// Récupération des champs
const nameInput = document.querySelector('#contactModal input[type="text"]');
const emailInput = document.querySelector('#contactModal input[type="email"]');
const messageInput = document.querySelector('#contactModal textarea');

if (sendBtn) {
  sendBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (sendBtn.disabled) return;

    // Réinitialiser les erreurs
    clearErrors();

    // Récupérer les valeurs
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    // === VALIDATIONS ===
    let hasError = false;

    // 1. Nom requis
    if (!name) {
      showError(nameInput, 'Le nom est requis.');
      hasError = true;
    }

    // 2. Email valide (contient @ et . après @)
    if (!email || !isValidEmail(email)) {
      showError(emailInput, 'Email invalide (ex: contact@exemple.com)');
      hasError = true;
    }

    // 3. Message > 10 caractères
    if (!message || message.length <= 10) {
      showError(messageInput, 'Message trop court (minimum 11 caractères).');
      hasError = true;
    }

    // Si erreur → stop
    if (hasError) {
      sendBtn.disabled = false;
      return;
    }

    // === ENVOI VALIDE ===
    sendBtn.disabled = true;
    btnText.style.opacity = '0';
    successText.style.display = 'none';

    // Ajouter le loader
    const loader = document.createElement('span');
    loader.className = 'btn-loader';
    loader.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 38 38" stroke="#ff8c2a">
        <g fill="none" fill-rule="evenodd">
          <g transform="translate(1 1)" stroke-width="2">
            <circle stroke-opacity=".5" cx="18" cy="18" r="18"/>
            <path d="M36 18c0-9.94-8.06-18-18-18">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 18 18"
                to="360 18 18"
                dur="1s"
                repeatCount="indefinite"/>
            </path>
          </g>
        </g>
      </svg>
    `;
    sendBtn.appendChild(loader);

    // === SIMULATION D'ENVOI (remplace par fetch plus tard) ===
    setTimeout(() => {
      loader.remove();

      // Succès
      successText.textContent = 'Envoyé avec succès !';
      successText.style.color = '#ff8c2a';
      sendBtn.classList.add('success');
      successText.style.display = 'flex';
      successText.style.opacity = '1';
      sendBtn.style.background = '#fff';
      sendBtn.style.boxShadow = '0 0 20px #ff8c2a';
      

      // Fermeture auto
      setTimeout(() => {
        modal.classList.remove('active');
        setTimeout(() => {
          modal.style.display = 'none';
          resetForm();
        }, 500);
      }, 2000);
    }, 1500);
  });
}

// === FONCTIONS UTILITAIRES ===

// Validation email stricte
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Afficher erreur sous le champ
function showError(input, message) {
  // Supprimer ancienne erreur
  const existingError = input.parentNode.querySelector('.error-msg');
  if (existingError) existingError.remove();

  const error = document.createElement('div');
  error.className = 'error-msg';
  error.style.color = '#e74c3c';
  error.style.fontSize = '12px';
  error.style.marginTop = '4px';
  error.textContent = message;

  input.parentNode.appendChild(error);
  input.style.borderColor = '#e74c3c';
}

// Nettoyer toutes les erreurs
function clearErrors() {
  document.querySelectorAll('.error-msg').forEach(el => el.remove());
  document.querySelectorAll('#contactModal input, #contactModal textarea').forEach(input => {
    input.style.borderColor = '';
  });
}

// Réinitialiser le formulaire
function resetForm() {
  nameInput.value = '';
  emailInput.value = '';
  messageInput.value = '';
  sendBtn.disabled = false;
  sendBtn.classList.remove('success');
  btnText.style.opacity = '1';
  successText.style.display = 'none';
  successText.style.opacity = '0';
  sendBtn.style.background = '';
  sendBtn.style.boxShadow = '';
  successText.textContent = '';
  clearErrors();
}
// === VARIABLES ===
const rgpdModal     = document.getElementById('rgpdModal');
const refuseModal   = document.getElementById('refuseModal');
const acceptBtn     = document.getElementById('acceptRgpd');
const refuseBtn     = document.getElementById('refuseRgpd');
const reopenBtn     = document.getElementById('reopenRgpd');
const closeRefuse   = document.getElementById('closeRefuse');

// === FONCTION SÉCURISÉE ===
function isRgpdAccepted() {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'rgpd_accepted' && value === 'true') {
      console.log('Cookie RGPD : ACCEPTÉ');
      return true;
    }
  }
  console.log('Cookie RGPD : REFUSÉ ou absent');
  return false;
}

// === AU CHARGEMENT ===
if (!isRgpdAccepted()) {
  rgpdModal.classList.add('active');
  sendBtn.disabled = false; // on s'assure que le bouton est réactif
}

// === BOUTONS RGPD ===
acceptBtn.addEventListener('click', () => {
  document.cookie = "rgpd_accepted=true; max-age=31536000; path=/; Secure; SameSite=Strict";
  rgpdModal.classList.remove('active');
  refuseModal.classList.remove('active');
  sendBtn.disabled = false; // réactive le bouton
  console.log('RGPD accepté → bouton réactivé');
});

refuseBtn.addEventListener('click', () => {
  rgpdModal.classList.remove('active');
  refuseModal.classList.add('active');
  sendBtn.disabled = false;
});

reopenBtn.addEventListener('click', () => {
  refuseModal.classList.remove('active');
  rgpdModal.classList.add('active');
});

closeRefuse.addEventListener('click', () => {
  refuseModal.classList.remove('active');
});

// === ENVOI : BLOCAGE TOTAL ===
sendBtn.addEventListener('click', (e) => {
  e.preventDefault();
  console.log('Clic sur Envoyer');

  // RÉACTIVE LE BOUTON AU DÉBUT
  sendBtn.disabled = false;

  // VÉRIFIE LE COOKIE
  if (!isRgpdAccepted()) {
    console.warn('ENVOI BLOQUÉ : RGPD non accepté');
    rgpdModal.classList.add('active');
    return;
  }

  console.log('RGPD accepté → validation');

  // === VALIDATION ===
  clearErrors();
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  let hasError = false;
  if (!name) { showError(nameInput, 'Le nom est requis.'); hasError = true; }
  if (!email || !isValidEmail(email)) { showError(emailInput, 'Email invalide.'); hasError = true; }
  if (!message || message.length <= 10) { showError(messageInput, 'Message trop court.'); hasError = true; }

  if (hasError) {
    sendBtn.disabled = false;
    return;
  }

  // === ENVOI ===
  sendBtn.disabled = true;
  btnText.style.opacity = '0';

  const loader = document.createElement('span');
  loader.className = 'btn-loader';
  loader.innerHTML = `<svg width="20" height="20" viewBox="0 0 38 38" stroke="#fff">
    <g fill="none" fill-rule="evenodd">
      <g transform="translate(1 1)" stroke-width="2">
        <circle stroke-opacity=".5" cx="18" cy="18" r="18"/>
        <path d="M36 18c0-9.94-8.06-18-18-18">
          <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite"/>
        </path>
      </g>
    </g>
  </svg>`;
  sendBtn.appendChild(loader);

  setTimeout(() => {
    loader.remove();
    sendBtn.classList.add('success');
    successText.style.opacity = '1';

    setTimeout(() => {
      modal.classList.remove('active');
      setTimeout(() => {
        modal.style.display = 'none';
        resetForm();
      }, 500);
    }, 2000);
  }, 1500);
});
// === POPUP POLITIQUE DE CONFIDENTIALITÉ ===
const privacyModal = document.getElementById('privacyModal');
const openPrivacyBtn = document.getElementById('openPrivacyPolicy');
const closePrivacyBtn = document.getElementById('closePrivacy');

openPrivacyBtn.addEventListener('click', (e) => {
  e.preventDefault();
  privacyModal.classList.add('active');
});

closePrivacyBtn.addEventListener('click', () => {
  privacyModal.classList.remove('active');
});

// Fermer en cliquant dehors
privacyModal.addEventListener('click', (e) => {
  if (e.target === privacyModal) {
    privacyModal.classList.remove('active');
  }
});
});