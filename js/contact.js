document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submit = document.getElementById('contact-submit');
    const success = document.getElementById('form-success');
    const error = document.getElementById('form-error');

    submit.disabled = true;
    const originalText = submit.textContent;
    submit.textContent = 'Enviando…';
    success.hidden = true;
    error.hidden = true;

    try {
      const res = await fetch('https://formspree.io/f/XXXXXX', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      });
      if (res.ok) {
        form.reset();
        success.hidden = false;
        setTimeout(() => {
          success.hidden = true;
        }, 5000);
      } else {
        error.hidden = false;
      }
    } catch (err) {
      console.error('Form submission error:', err);
      error.hidden = false;
    } finally {
      submit.disabled = false;
      submit.textContent = originalText;
    }
  });
});
