const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const generateOTP = require('./otpGenerator');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

async function sendOTP(email) {
  const otp = generateOTP();
  
  const templatePath = path.join(__dirname, 'email-template.html');
  let html = fs.readFileSync(templatePath, 'utf8');
  
  // Replace the placeholder with the actual OTP
  html = html.replace('{{otp}}', otp);

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'OTP for Password Reset',
    html: html,  // Use HTML instead of text
  };

  try {
    await transporter.sendMail(mailOptions);
    return otp;
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw new Error('Failed to send OTP. Please try again later.');
  }
}

module.exports = {
  sendOTP,
};
