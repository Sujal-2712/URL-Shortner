
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const generateOTP = require('./otpGenerator');


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APPPASSWORD,
  },
});

async function sendOTP(email) {
  try {
    const otp = generateOTP();
    console.log('Generated OTP:', otp);

    const templatePath = path.join(__dirname, 'email-template.html');
    console.log('Template Path:', templatePath);

    if (!fs.existsSync(templatePath)) {
      console.error('Email template file does not exist:', templatePath);
      throw new Error('Email template file not found');
    }

    let html = fs.readFileSync(templatePath, 'utf8');
    
    html = html.replace('{{otp}}', otp);

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'OTP for Password Reset',
      html: html,  // Use HTML instead of text
    };

    await transporter.sendMail(mailOptions);
    console.log('OTP sent successfully to:', email);
    return otp;
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw new Error('Failed to send OTP. Please try again later.');
  }
}

module.exports = {
  sendOTP,
};
