document.getElementById('resetPasswordForm').addEventListener('submit', async function (event) {
    event.preventDefault();
  
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');
    
    const formData = new FormData(this);
    formData.append('email', email);
  
    try {
      const response = await fetch('/user/reset-password', {
        method: "POST",
        body: new URLSearchParams(formData), // Serialize the form data
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
  
      const data = await response.json();
  
      if (data.error) {
        alert(data.message);
      } else {
        alert(data.message);
        window.location.href = '/login';
      }
  
    } catch (error) {
      console.log("Error:", error);
    }
  });
  