console.log("sujal");
document
  .getElementById("forgotPasswordForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    let msg = document.getElementById("msg");
    msg.innerText = "";

    const formData = new FormData(this);
    try {
      const response = await fetch("/user/forgot-password", {
        method: "POST",
        body: new URLSearchParams(formData),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      const data = await response.json();

      if (data.error) {
        msg.innerText = data.message;
      } else {
        msg.innerText = data.message;
        document.getElementById("forgotPasswordForm").classList.add("hidden");
        document.getElementById("verifyOtpForm").classList.remove("hidden");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  });

document
  .getElementById("verifyOtpForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const email = document.getElementById("email").value; // Get the email from the hidden field
    formData.append("email", email);

    let msg = document.getElementById("msg");
    msg.innerText = "";

    try {
      const response = await fetch("/user/verify-otp", {
        method: "POST",
        body: new URLSearchParams(formData), // Serialize the form data
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const data = await response.json();

      if (data.error) {
        msg.innerText = data.message;
      } else {
        msg.innerText = data.message;
        document.getElementById("verifyOtpForm").classList.add("hidden");
        document.getElementById("resetPasswordForm").classList.remove("hidden");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  });

document
  .getElementById("resetPasswordForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const email = document.getElementById("email").value; // Get the email from the hidden field
    const otp = document.getElementById("otp").value; // Get the OTP from the hidden field
    formData.append("email", email);
    formData.append("otp", otp);

    let msg = document.getElementById("msg");
    msg.innerText = "";

    try {
      const response = await fetch("/user/reset-password", {
        method: "POST",
        body: new URLSearchParams(formData), // Serialize the form data
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const data = await response.json();

      if (data.error) {
        msg.innerText = data.message;
      } else {
        msg.innerText = data.message;
        window.location.href = "/login";
      }
    } catch (error) {
      console.log("Error:", error);
    }
  });
