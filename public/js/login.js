document.getElementById('myForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    try {

      const response = await fetch('/user/login', {
        method: "POST",
        body: new URLSearchParams(formData), // Serialize the form data
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const data=await response.json();

      if(data.error)
      {
          let errorMessage=document.getElementById('error-message');
          errorMessage.innerText=data.message;

          document.getElementById('password').value="";
      }
      else{
        window.location.href='/user/profile';
      }

    } catch (error) {
      console.log("Error:",error);
    }
  });