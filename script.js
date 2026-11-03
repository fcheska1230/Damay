// 1. Target Element Selection (HTML -> JS)
const yearSpan = document.getElementById('year');
const themeBtn = document.getElementById('theme-btn');
const contactBtn = document.getElementById('contact-btn');

// 2. Dynamic Content Injection (JS -> HTML)
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// 2b. Ransom-note lettering: each letter becomes a "cut-out" styled by CSS (.c0 - .c5)
document.querySelectorAll('.ransom').forEach((el) => {
  const text = el.dataset.text || el.textContent;
  el.textContent = '';
  [...text].forEach((ch, i) => {
    const span = document.createElement('span');
    span.setAttribute('aria-hidden', 'true');
    if (ch === ' ') {
      span.className = 'space';
      span.innerHTML = '&nbsp;';
    } else {
      span.textContent = ch;
      span.className = 'c' + (i % 6);
    }
    el.appendChild(span);
  });
});

// 3. Event Handling and Class Toggling (JS -> HTML/CSS)
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    // Toggles .dark-mode defined in style.css on the <body> tag
    document.body.classList.toggle('dark-mode');
  });
}

// 4. Interactive Feedback
if (contactBtn) {
  contactBtn.addEventListener('click', () => {
    alert('Thank you for reaching out! Email me at fdamay_260000000973@uic.edu.ph. A contact form is coming soon.');
  });
}

// 5. Slides fade in as you scroll
const slides = document.querySelectorAll('.slide');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  slides.forEach((s) => observer.observe(s));
} else {
  slides.forEach((s) => s.classList.add('visible'));
}
