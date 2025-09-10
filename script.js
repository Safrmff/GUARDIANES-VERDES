document.addEventListener('DOMContentLoaded', function() {
  /* ---------- CARRUSEL AUTOMÁTICO (con pausa on hover y puntos) ---------- */
  const carousel = document.getElementById('mainCarousel');
  const slides = carousel.querySelectorAll('.slide');
  const prevBtn = carousel.querySelector('.prev');
  const nextBtn = carousel.querySelector('.next');
  const dots = carousel.querySelectorAll('.dot');

  let current = 0;
  let timer = null;

  function showSlide(index) {
    slides.forEach(s => s.style.display = 'none');
    dots.forEach(d => d.classList.remove('active'));
    slides[index].style.display = 'block';
    dots[index].classList.add('active');
    current = index;
  }

  function nextSlide() {
    let newIndex = (current + 1) % slides.length;
    showSlide(newIndex);
  }

  function startCarousel() {
    timer = setInterval(nextSlide, 4000);
  }

  function stopCarousel() {
    clearInterval(timer);
  }

  // Iniciar
  showSlide(0);
  startCarousel();

  // Controles
  prevBtn.addEventListener('click', () => { stopCarousel(); showSlide((current - 1 + slides.length) % slides.length); startCarousel(); });
  nextBtn.addEventListener('click', () => { stopCarousel(); showSlide((current + 1) % slides.length); startCarousel(); });

  // Dots
  dots.forEach((dot, i) => dot.addEventListener('click', () => { stopCarousel(); showSlide(i); startCarousel(); }));

  // Pausa al hover
  carousel.addEventListener('mouseover', stopCarousel);
  carousel.addEventListener('mouseleave', startCarousel);


  /* ---------- LIGHTBOX (modal) para la galería ---------- */
  const galleryImgs = document.querySelectorAll('.gallery-grid img');
  const lightbox = document.getElementById('lightbox');
  const lbImg = lightbox.querySelector('.lb-img');
  const lbClose = lightbox.querySelector('.lb-close');
  const lbPrev = lightbox.querySelector('.lb-prev');
  const lbNext = lightbox.querySelector('.lb-next');

  let lbIndex = 0;
  const images = Array.from(galleryImgs).map(img => img.src);

  function openLightbox(i) {
    lbIndex = i;
    lbImg.src = images[lbIndex];
    lightbox.style.display = 'flex';
    lightbox.setAttribute('aria-hidden', 'false');
  }
  function closeLightbox() {
    lightbox.style.display = 'none';
    lightbox.setAttribute('aria-hidden', 'true');
  }
  function showLbNext() {
    lbIndex = (lbIndex + 1) % images.length;
    lbImg.src = images[lbIndex];
  }
  function showLbPrev() {
    lbIndex = (lbIndex - 1 + images.length) % images.length;
    lbImg.src = images[lbIndex];
  }

  galleryImgs.forEach((img, i) => {
    img.addEventListener('click', () => openLightbox(i));
  });
  lbClose.addEventListener('click', closeLightbox);
  lbNext.addEventListener('click', showLbNext);
  lbPrev.addEventListener('click', showLbPrev);

  // Cerrar con ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showLbNext();
    if (e.key === 'ArrowLeft') showLbPrev();
  });

  // Cerrar si clic fuera de la imagen
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });


  /* ---------- REVEAL ANIMATION: aparecer al hacer scroll ---------- */
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, {threshold: 0.12});

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});
