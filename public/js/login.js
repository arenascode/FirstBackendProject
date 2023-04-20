const loginForm = document.getElementById('loginForm')

if (loginForm instanceof HTMLFormElement) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const dataForm = new FormData(loginForm)
    const userMail = dataForm.get('email')
    const userPass = dataForm.get("password");
    
    const objLogin = {}
    objLogin.userMail = userMail,
    objLogin.userPass = userPass

    fetch("/sessions/login", {
      method: "POST",
      body: JSON.stringify(objLogin),
      headers: { "content-type": "application/json" },
    }).then((result) => {
      console.log(result.status);
      if (result.status === 200) {
        window.location.replace("/profile");
      } else if (result.status === 401) { 
        alert("invalid password. Try Again")
      } else if (result.status === 404) {
        alert('invalid credentials. Try Again')
      }
        
      
    });
  })
}