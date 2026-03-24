const nodemailer = require('nodemailer');

// Create reusable transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: false, // true for 465, false for 587
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

/**
 * Send contact form submission via email
 * @param {Object} contactData - { name, email, phone, subject, message }
 */
const sendContactEmail = async (contactData) => {
  const { name, email, phone, subject, message } = contactData;

  const transporter = createTransporter();

  const mailOptions = {
    from: `"Supreme Chappathi Website" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO || 'gurudayaluday2003@gmail.com',
    replyTo: email,
    subject: `📩 New Contact Form: ${subject}`,
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #fafafa; border-radius: 12px; overflow: hidden; border: 1px solid #e0e0e0;">
        <div style="background: linear-gradient(135deg, #e65100, #ff8f00); padding: 24px 32px;">
          <h1 style="color: #fff; margin: 0; font-size: 22px;">🍞 Supreme Chappathi</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 6px 0 0; font-size: 14px;">New Contact Form Submission</p>
        </div>
        <div style="padding: 28px 32px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: 600; color: #555; width: 120px;">Name</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #222;">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: 600; color: #555;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #222;"><a href="mailto:${escapeHtml(email)}" style="color: #e65100;">${escapeHtml(email)}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: 600; color: #555;">Phone</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #222;"><a href="tel:${escapeHtml(phone)}" style="color: #e65100;">${escapeHtml(phone)}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: 600; color: #555;">Subject</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #222;">${escapeHtml(subject)}</td>
            </tr>
          </table>
          <div style="margin-top: 20px;">
            <p style="font-weight: 600; color: #555; margin-bottom: 8px;">Message</p>
            <div style="background: #fff; border: 1px solid #e0e0e0; border-radius: 8px; padding: 16px; color: #333; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(message)}</div>
          </div>
        </div>
        <div style="background: #f5f5f5; padding: 16px 32px; text-align: center; font-size: 12px; color: #999;">
          Sent from the Supreme Chappathi website contact form
        </div>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};

/**
 * Escape HTML to prevent XSS in email content
 */
function escapeHtml(text) {
  if (!text) return '';
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return String(text).replace(/[&<>"']/g, (m) => map[m]);
}

module.exports = { sendContactEmail };
