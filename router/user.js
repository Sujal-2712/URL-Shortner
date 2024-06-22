const express = require("express");
const auth = require("./../middleware/auth");
const router = express.Router();
const {
  handleUserLogin,
  handleUserSignup,
  renderProfile,
  deleteURL,
} = require("./../controller/user");
const { sendOTP } = require("./../controller/authController");
const user = require("./../models/user");
const { handleGenerateNewShortURL } = require("./../controller/url");

router.post("/signup", handleUserSignup);

router.post("/login", handleUserLogin);

router.get("/profile", auth, renderProfile);

router.post("/url", auth, handleGenerateNewShortURL);

router.get("/delete", deleteURL);

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const User = await user.findOne({ email });

    if (!User) {
      return res.status(404).json({ message: "User not found.", error: 1 });
    }

    const otp = await sendOTP(email);
    User.resetPasswordOTP = otp;
    await User.save();

    return res
      .status(200)
      .json({ message: "OTP sent successfully.", error: 0 });
  } catch (error) {
    console.error("Forgot password error:", error);
    return res.status(500).json({ message: "Failed to send OTP.", error: 1 });
  }
});

router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  try {
    const User = await user.findOne({ email });

    if (!User || User.resetPasswordOTP !== otp) {
      return res.status(400).json({ message: "Invalid OTP.", error: 1 });
    }

    return res
      .status(200)
      .json({ message: "OTP verified successfully.", error: 0 });
  } catch (error) {
    console.error("Verify OTP error:", error);
    return res.status(500).json({ message: "Failed to verify OTP.", error: 1 });
  }
});

router.post("/reset-password", async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    const User = await user.findOne({ email });
    User.password = newPassword;
    User.resetPasswordOTP = null;
    await User.save();

    return res
      .status(200)
      .json({ message: "Password reset successfully.", error: 0 });
  } catch (error) {
    console.error("Reset password error:", error);
    return res
      .status(500)
      .json({ message: "Failed to reset password.", error: 1 });
  }
});

module.exports = router;
