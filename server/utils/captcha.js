/**
 * hCaptcha verification utility
 * Verifies the hCaptcha token sent from the frontend
 */

const verifyCaptcha = async (token) => {
  if (!token) {
    return { success: false, message: 'CAPTCHA verification required' };
  }

  const secret = process.env.HCAPTCHA_SECRET;
  if (!secret) {
    console.warn('⚠️ HCAPTCHA_SECRET not set — skipping verification');
    return { success: true }; // Skip if not configured
  }

  try {
    const response = await fetch('https://api.hcaptcha.com/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `response=${token}&secret=${secret}`
    });

    const data = await response.json();
    return { success: data.success, message: data.success ? 'Verified' : 'CAPTCHA verification failed' };
  } catch (err) {
    console.error('❌ hCaptcha verification error:', err.message);
    return { success: false, message: 'CAPTCHA verification error' };
  }
};

module.exports = { verifyCaptcha };
