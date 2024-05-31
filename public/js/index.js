document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuButton = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("navbar-cta");

  mobileMenuButton.addEventListener("click", function () {
    mobileMenu.classList.toggle("hidden");
    const expanded = mobileMenuButton.getAttribute("aria-expanded") === "true";
    mobileMenuButton.setAttribute("aria-expanded", !expanded);
  });
});

document
  .getElementById("myForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    try {
      const formData = new FormData(this);
      const result = await fetch("/url", {
        method: "POST",
        body: new URLSearchParams(formData),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const data = await result.json();
      if (data.error) {
        console.error("Error in generating Shrt-URL", data.error);
        alert("Error in generating Shrt-URL");
      } else if (data.message) {
        document.getElementById("message").innerText = data.message;
        document.getElementById(
          "outputurl"
        ).innerHTML = `<a href="${data.redirect}" class="underline text-blue-400">${data.url}</a>`;
      } else {
        document.getElementById("inputurl").value = data.redirect;
        document.getElementById(
          "outputurl"
        ).innerHTML = `<a href="${data.redirect}" class="underline text-blue-400">${data.url}</a>`;
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  });
