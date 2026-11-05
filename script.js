// 1. Target Element Selection (HTML -> JS)
const yearSpan = document.getElementById('year');
const themeBtn = document.getElementById('theme-btn');
const contactBtn = document.getElementById('contact-btn');
const contactInfo = document.getElementById('contact-info');

// 2. Dynamic Content Injection (JS -> HTML)
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Ransom-note titles: wrap each letter in a span so CSS can style it like cut-out paper
document.querySelectorAll('[data-ransom]').forEach((el) => {
  const text = el.textContent.trim();
  el.setAttribute('aria-label', text);
  el.textContent = '';
  [...text].forEach((ch, i) => {
    if (ch === ' ') {
      el.appendChild(document.createTextNode(' '));
      return;
    }
    const span = document.createElement('span');
    span.className = 'l l' + (i % 6);
    span.textContent = ch;
    span.setAttribute('aria-hidden', 'true');
    el.appendChild(span);
  });
});

// 3. Event Handling and Class Toggling (JS -> HTML/CSS)
function applyTheme(isDark) {
  document.body.classList.toggle('dark-mode', isDark);
  if (themeBtn) {
    themeBtn.textContent = isDark ? 'Toggle Light Mode' : 'Toggle Dark Mode';
  }
}

// Remember the visitor's choice (storage can be blocked, so guard it)
try {
  applyTheme(localStorage.getItem('theme') === 'dark');
} catch (e) { /* ignore */ }

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    // Toggles .dark-mode defined in style.css on the <body> tag
    const isDark = !document.body.classList.contains('dark-mode');
    applyTheme(isDark);
    try { localStorage.setItem('theme', isDark ? 'dark' : 'light'); } catch (e) { /* ignore */ }
  });
}

// 4. Interactive Feedback
if (contactBtn && contactInfo) {
  contactBtn.addEventListener('click', () => {
    const opening = contactInfo.hidden;
    contactInfo.hidden = !opening;
    contactBtn.textContent = opening ? 'Thank you for reaching out! ♡' : 'Get in Touch';
  });
}


// 5. Copy the email (clipboard can be refused, so fall back to selecting the text)
const copyBtn = document.getElementById('copy-btn');
const emailEl = document.getElementById('email-text');
if (copyBtn && emailEl) {
  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(emailEl.textContent);
      copyBtn.textContent = 'Copied!';
    } catch (e) {
      const r = document.createRange(); r.selectNodeContents(emailEl);
      const s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
      copyBtn.textContent = 'Press Ctrl/Cmd+C';
    }
    setTimeout(() => { copyBtn.textContent = 'Copy email'; }, 2000);
  });
}
