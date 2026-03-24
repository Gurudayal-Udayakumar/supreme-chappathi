/**
 * Email service using Web3Forms API
 * Uses HTTPS (port 443) — works on all hosting platforms including Render free tier
 * Get your free API key at https://web3forms.com
 */

const sendContactEmail = async (contactData) => {
  const { name, email, phone, subject, message } = contactData;

  const apiKey = process.env.WEB3FORMS_KEY;
  if (!apiKey) {
    throw new Error('WEB3FORMS_KEY not set in environment variables');
  }

  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      access_key: apiKey,
      subject: `📩 New Contact Form: ${subject}`,
      from_name: 'Supreme Chappathi Website',
      name: name,
      email: email,
      phone: phone,
      message: message
    })
  });

  const result = await response.json();
  if (!result.success) {
    throw new Error(result.message || 'Web3Forms email delivery failed');
  }

  return result;
};

module.exports = { sendContactEmail };
