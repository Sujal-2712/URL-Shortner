document
    .getElementById("myForm")
    .addEventListener("submit", async function (event) {
        event.preventDefault();

        const formData = new FormData(this);

        try {
            const response = await fetch("/user/signup", {
                method: "POST",
                body: new URLSearchParams(formData), // Serialize the form data
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            const data = await response.json();
            console.log(data);

            if (data.error) {
                let errorMessage = document.getElementById("error-message");

                if (data.message === "Passwords are not matched") {
                    errorMessage.innerText = data.message;
                } else errorMessage.innerText = data.message;
                document.getElementById("password").value = "";
                document.getElementById("cpassword").value = "";
            } else {
                window.location.href = "/login";
            }
        } catch (error) {
            console.log("Error: ", error);
        }
    });
