// ============================================================
//  app.js  —  Contact Form → Google Sheets
// ============================================================

const scriptURL = 'https://script.google.com/macros/s/AKfycbwKmjG3NyNpPrtA5bRSopIAyI7yn-M5KIMtI-4XpOA0hxy2QxYySDxpqj0zQdE_n-4u/exec';

document.addEventListener('DOMContentLoaded', () => {
  const form             = document.forms['submit-to-google-sheet'];
  const messageContainer = document.getElementById('msg');

  if (!form || !messageContainer) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    messageContainer.textContent  = 'Sending…';
    messageContainer.style.color  = 'var(--muted)';

    fetch(scriptURL, {
      method: 'POST',
      body: new FormData(form)
    })
    .then(response => response.json())
    .then(data => {
      if (data.result === 'success') {
        messageContainer.textContent = '✅ Message sent successfully!';
        messageContainer.style.color = 'var(--success)';
        form.reset();
      } else {
        messageContainer.textContent = '❌ Submission failed. Please try again.';
        messageContainer.style.color = 'var(--danger)';
      }
    })
    .catch(error => {
      messageContainer.textContent = '⚠️ An error occurred: ' + error.message;
      messageContainer.style.color = 'var(--danger)';
    });
  });
});
