/* ==========================================================================
   Maya Prado Portfolio - Whimsical Petals & Interactions
   Author: Maya Prado (mayaezprado@gmail.com)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Soft Cursor Aura Follower
  const aura = document.getElementById('cursor-aura');
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let auraX = mouseX;
  let auraY = mouseY;

  if (aura && window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const animateAura = () => {
      auraX += (mouseX - auraX) * 0.08;
      auraY += (mouseY - auraY) * 0.08;
      aura.style.left = `${auraX}px`;
      aura.style.top = `${auraY}px`;
      requestAnimationFrame(animateAura);
    };
    animateAura();
  }

  // 2. Floating Pastel Flower Petals Canvas
  const canvas = document.getElementById('petal-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const petalColors = [
      'rgba(255, 210, 222, 0.75)', // Soft blush pink
      'rgba(242, 225, 250, 0.7)',  // Lilac mist
      'rgba(254, 245, 214, 0.75)', // Buttercup cream
      'rgba(220, 237, 220, 0.65)'  // Sage leaf
    ];

    class Petal {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : -20;
        this.size = 9 + Math.random() * 9;
        this.speedY = 0.5 + Math.random() * 1.1;
        this.speedX = (Math.random() - 0.5) * 0.7;
        this.angle = Math.random() * Math.PI * 2;
        this.angularSpeed = (Math.random() - 0.5) * 0.02;
        this.color = petalColors[Math.floor(Math.random() * petalColors.length)];
        this.sway = Math.random() * 2;
        this.swaySpeed = 0.01 + Math.random() * 0.015;
      }

      update() {
        this.angle += this.angularSpeed;
        this.x += Math.sin(this.angle) * this.sway + this.speedX;
        this.y += this.speedY;

        if (this.y > height + 20 || this.x < -30 || this.x > width + 30) {
          this.reset(false);
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        // Whimsical organic petal shape
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-this.size / 2, -this.size, -this.size, this.size / 2, 0, this.size);
        ctx.bezierCurveTo(this.size, this.size / 2, this.size / 2, -this.size, 0, 0);
        ctx.fill();
        ctx.restore();
      }
    }

    const petals = [];
    const petalCount = window.innerWidth < 768 ? 16 : 28;
    for (let i = 0; i < petalCount; i++) {
      petals.push(new Petal());
    }

    const renderPetals = () => {
      ctx.clearRect(0, 0, width, height);
      petals.forEach((p) => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(renderPetals);
    };
    renderPetals();
  }

  // 3. Modal / Lightbox functionality
  const modal = document.getElementById('artwork-modal');
  const trigger = document.getElementById('open-artwork-modal');
  const closeBtn = document.getElementById('close-modal');

  if (modal && trigger && closeBtn) {
    const openModal = () => {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    };

    trigger.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  // 4. Copy Email Action
  const copyBtn = document.getElementById('copy-email-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const email = 'mayaezprado@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        const originalText = copyBtn.innerText;
        copyBtn.innerText = 'Copied! 🌸';
        copyBtn.style.background = 'var(--accent-sage)';
        copyBtn.style.color = '#ffffff';

        setTimeout(() => {
          copyBtn.innerText = originalText;
          copyBtn.style.background = '';
          copyBtn.style.color = '';
        }, 2200);
      });
    });
  }

  // 5. Contact Form Feedback
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      formStatus.style.display = 'block';
      formStatus.innerText = 'Thank you for reaching out! 🌸 Your message was received.';
      contactForm.reset();
      setTimeout(() => {
        formStatus.style.display = 'none';
      }, 5000);
    });
  }
});
