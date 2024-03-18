document.addEventListener("DOMContentLoaded", function () {
    const mobileMenuButton = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("navbar-cta");

    mobileMenuButton.addEventListener("click", function () {
        mobileMenu.classList.toggle("hidden");
        const expanded = mobileMenuButton.getAttribute("aria-expanded") === "true";
        mobileMenuButton.setAttribute("aria-expanded", !expanded);
    });
});
console.log("Sujal");
document
    .getElementById("myForm")
    .addEventListener("submit", async function (event) {
        event.preventDefault();

        const formData = new FormData(this);
        // console.log(formData);

        const result = await fetch("/url", {
            method: "POST",
            body: new URLSearchParams(formData),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });

        const data = await result.json();

        if (data.error) {
            console.log("Error in generating Shrt-URL");
        } else {
            document.getElementById("inputurl").value = data.redirect;
            document.getElementById("outputurl").innerHTML = `<a href="${data.redirect}" class="underline text-blue-400"> ${data.url} </a>`
        }
    });
