/**
 * 7 HILLS FITNESS — JAVASCRIPT LOGIC
 * Strict match to Video 1 design reference
 * Verified Phone: 076988 40758
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initDurationSwitcher();
  initGalleryFilterAndLightbox();
  initPlanEnquireTriggers();
  initEnquiryForm();
});

/* --------------------------------------------------------------------------
   1. MOBILE NAVIGATION
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');
  const items = document.querySelectorAll('.nav-links .nav-link-item');

  if (!toggleBtn || !navLinks) return;

  const toggle = (force) => {
    const isExpanded = force !== undefined ? force : toggleBtn.getAttribute('aria-expanded') === 'true';
    const nextState = !isExpanded;

    toggleBtn.setAttribute('aria-expanded', String(nextState));
    navLinks.classList.toggle('open', nextState);
    document.body.style.overflow = nextState ? 'hidden' : '';
  };

  toggleBtn.addEventListener('click', () => toggle());

  items.forEach((item) => {
    item.addEventListener('click', () => {
      if (navLinks.classList.contains('open')) {
        toggle(false);
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      toggle(false);
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900 && navLinks.classList.contains('open')) {
      toggle(false);
    }
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   2. MEMBERSHIP DURATION SWITCHER
   -------------------------------------------------------------------------- */
function initDurationSwitcher() {
  const durationBtns = document.querySelectorAll('.duration-btn');
  const durationLabels = document.querySelectorAll('.duration-desc-label');

  if (!durationBtns.length) return;

  const descriptions = {
    monthly: 'Flexible monthly renewal • Price on enquiry',
    quarterly: 'Recommended 3-month consistency cycle • Price on enquiry',
    annual: 'Dedicated 12-month transformation • Price on enquiry'
  };

  durationBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      durationBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const selected = btn.getAttribute('data-duration');
      const text = descriptions[selected] || 'Price on enquiry';

      durationLabels.forEach((label) => {
        label.textContent = text;
      });
    });
  });
}

/* --------------------------------------------------------------------------
   3. GALLERY FILTERING & LIGHTBOX
   -------------------------------------------------------------------------- */
function initGalleryFilterAndLightbox() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-card-item');
  const lightbox = document.getElementById('lightbox-dialog');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxClose = document.getElementById('lightbox-close');

  // Filtering
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      galleryItems.forEach((item) => {
        const cat = item.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Lightbox
  if (lightbox && lightboxImg) {
    galleryItems.forEach((item) => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const title = item.querySelector('.gallery-title-text')?.textContent || '7 Hills Fitness';
        const tag = item.querySelector('.gallery-tag-text')?.textContent || 'Siddhpur, Gujarat';

        if (img) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt;
          if (lightboxTitle) lightboxTitle.textContent = `${tag} — ${title}`;
          lightbox.showModal();
        }
      });
    });

    if (lightboxClose) {
      lightboxClose.addEventListener('click', () => lightbox.close());
    }

    // Light dismiss on backdrop click
    lightbox.addEventListener('click', (e) => {
      const dims = lightbox.getBoundingClientRect();
      if (
        e.clientX < dims.left ||
        e.clientX > dims.right ||
        e.clientY < dims.top ||
        e.clientY > dims.bottom
      ) {
        lightbox.close();
      }
    });
  }
}

/* --------------------------------------------------------------------------
   4. PLAN ENQUIRE SHORTCUT
   -------------------------------------------------------------------------- */
function initPlanEnquireTriggers() {
  const planTriggers = document.querySelectorAll('.plan-enquire-trigger');
  const planSelect = document.getElementById('input-plan');
  const visitSection = document.getElementById('visit-us');

  planTriggers.forEach((btn) => {
    btn.addEventListener('click', () => {
      const planName = btn.getAttribute('data-plan');
      if (planSelect && planName) {
        planSelect.value = planName;
      }
      if (visitSection) {
        visitSection.scrollIntoView({ behavior: 'smooth' });
        const nameInput = document.getElementById('input-name');
        if (nameInput) setTimeout(() => nameInput.focus(), 500);
      }
    });
  });
}

/* --------------------------------------------------------------------------
   5. WORKING ENQUIRY FORM & VERIFIED DIRECT DISPATCH
   -------------------------------------------------------------------------- */
function initEnquiryForm() {
  const form = document.getElementById('enquiry-form');
  const inputsContainer = document.getElementById('form-inputs-container');
  const outcomeContainer = document.getElementById('form-outcome-container');
  const outcomeName = document.getElementById('outcome-user-name');
  const whatsappAction = document.getElementById('outcome-whatsapp-btn');
  const resetBtn = document.getElementById('outcome-reset-btn');

  if (!form) return;

  const nameInput = document.getElementById('input-name');
  const phoneInput = document.getElementById('input-phone');
  const serviceSelect = document.getElementById('input-service');
  const planSelect = document.getElementById('input-plan');
  const messageInput = document.getElementById('input-message');

  const validateName = (name) => name.trim().length >= 2;
  const validatePhone = (phone) => {
    const digits = phone.replace(/[\s\-\(\)\+]/g, '').replace(/^91/, '').replace(/^0/, '');
    return /^[6-9]\d{9}$/.test(digits);
  };

  const toggleErr = (field, isError) => {
    const parent = field.closest('.field-group');
    if (parent) {
      if (isError) parent.classList.add('has-err');
      else parent.classList.remove('has-err');
    }
  };

  if (nameInput) {
    nameInput.addEventListener('input', () => {
      if (validateName(nameInput.value)) toggleErr(nameInput, false);
    });
  }

  if (phoneInput) {
    phoneInput.addEventListener('input', () => {
      if (validatePhone(phoneInput.value)) toggleErr(phoneInput, false);
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let valid = true;

    if (!nameInput || !validateName(nameInput.value)) {
      if (nameInput) toggleErr(nameInput, true);
      valid = false;
    } else {
      toggleErr(nameInput, false);
    }

    if (!phoneInput || !validatePhone(phoneInput.value)) {
      if (phoneInput) toggleErr(phoneInput, true);
      valid = false;
    } else {
      toggleErr(phoneInput, false);
    }

    if (!valid) {
      const firstErr = form.querySelector('.field-group.has-err input');
      if (firstErr) firstErr.focus();
      return;
    }

    const userName = nameInput.value.trim();
    const userPhone = phoneInput.value.trim();
    const userService = serviceSelect?.value || 'Strength & Weight Training';
    const userPlan = planSelect?.value || 'Pro Plan';
    const userMsg = messageInput?.value.trim() || 'Please share gym membership details and shift timings.';

    // Direct pre-filled WhatsApp link for verified gym phone 076988 40758 -> 917698840758
    const waText = encodeURIComponent(
      `Hello 7 Hills Fitness,\n` +
      `My name is ${userName}.\n` +
      `I am interested in joining your gym at Krishna Arcade, Siddhpur.\n\n` +
      `• Discipline: ${userService}\n` +
      `• Membership Tier: ${userPlan}\n` +
      `• Mobile Number: ${userPhone}\n` +
      `• Message: ${userMsg}\n\n` +
      `Please let me know current membership pricing and batch timings.`
    );
    const waUrl = `https://wa.me/917698840758?text=${waText}`;

    if (outcomeName) outcomeName.textContent = userName;
    if (whatsappAction) whatsappAction.href = waUrl;

    if (inputsContainer) inputsContainer.style.display = 'none';
    if (outcomeContainer) outcomeContainer.classList.add('active');

    outcomeContainer?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      form.reset();
      if (outcomeContainer) outcomeContainer.classList.remove('active');
      if (inputsContainer) inputsContainer.style.display = 'block';
    });
  }
}
