/**
 * Email service — placeholder
 * Email delivery is now handled client-side via Web3Forms (free tier requires browser-based submissions)
 * Backend only saves contact data to MongoDB
 */

const sendContactEmail = async (contactData) => {
  // Email is sent from the frontend via Web3Forms
  // This function is kept for API compatibility but does nothing
  console.log('📧 Contact saved to database. Email is handled client-side via Web3Forms.');
};

module.exports = { sendContactEmail };
