const formRegister = document.getElementById('formRegister')
console.log(formRegister);

if (formRegister instanceof HTMLFormElement) {
  formRegister.addEventListener('submit', (e) => {
    e.preventDefault()
    const dataUser = new FormData(formRegister)
    const userName = dataUser.get('name')
    const userLastName = dataUser.get('lastName')
    const userEmail = dataUser.get("email");
    const userAge = dataUser.get("age");
    const userPass = dataUser.get("password");
    
    const objDataUser = {}
    objDataUser.name= userName
    objDataUser.lastName= userLastName
    objDataUser.email= userEmail
    objDataUser.age= userAge
    objDataUser.password = userPass;

    fetch("/sessions/register", {
      method: "POST",
      body: JSON.stringify(objDataUser),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.text())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  })
}