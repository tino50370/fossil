// subscribe.js
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('subscribe-form');
  const emailInput = document.getElementById('email');
  const errorDiv = document.getElementById('email-error');
  const submitBtn = document.getElementById('subscribe-btn');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorDiv.style.display = 'none';
    submitBtn.classList.remove('success');

    const email = emailInput.value.trim();
    if (!validateEmail(email)) {
      errorDiv.style.display = 'block';
      return;
    }

    // send to PHP endpoint
    try {
      const response = await fetch('subscribe.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `email=${encodeURIComponent(email)}`
      });
      if (!response.ok) throw new Error('Network response was not OK');
      const result = await response.json();
      if (result.success) {
        submitBtn.classList.add('success');
        submitBtn.textContent = 'Subscribed!';
      } else {
        throw new Error(result.message || 'Subscription failed');
      }
    } catch (err) {
      errorDiv.textContent = err.message;
      errorDiv.style.display = 'block';
    }
  });

  function validateEmail(email) {
    // simple regex for basic validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
});
