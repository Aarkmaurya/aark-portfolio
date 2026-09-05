/* ==========================================================================
   Aark Maurya — Portfolio Script
   Vanilla JS, no dependencies. Edit freely.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close the mobile menu after a link is tapped
    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Active nav link on scroll ---------- */
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const setActiveLink = () => {
    let currentId = '';
    const scrollY = window.scrollY + 96; // offset for sticky nav

    sections.forEach((section) => {
      if (scrollY >= section.offsetTop) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
  };

  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ---------- Contact form ----------
     This is a static site with no backend, so the form can't actually
     send email by itself. This handler validates input and then opens
     the visitor's email client via a mailto: link.

     EDIT ME: if you set up a form service (e.g. Formspree) instead,
     replace this handler with a fetch() POST to that service.
  */
  const form = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');

  const CONTACT_EMAIL = 'nexoratechnologies57@gmail.com';

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      if (!name || !email || !message) {
        showNote('Please fill in all fields.', true);
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        showNote('Please enter a valid email address.', true);
        return;
      }

      const subject = encodeURIComponent(`Portfolio contact from ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

      window.location.href = mailtoLink;
      showNote('Opening your email client…', false);
    });
  }

  function showNote(text, isError) {
    if (!formNote) return;
    formNote.textContent = text;
    formNote.classList.toggle('error', isError);
  }

});
