const formRegister = document.getElementById('formRegister')
console.log(formRegister);

if (formRegister instanceof HTMLFormElement) {
  formRegister.addEventListener('submit', (e) => {
    e.preventDefault()
    const dataUser = new FormData(formRegister)
    const userName = dataUser.get('name')
    console.log(userName);
    const userLastName = dataUser.get('lastName')
    console.log(userLastName);
    const userEmail = dataUser.get("email");
    console.log(userEmail);
    const userAge = dataUser.get("age");
    console.log(userAge);
    const userPass = dataUser.get("password");
    console.log(userPass);

    const objDataUser = {}
    objDataUser.name= userName
    objDataUser.lastName= userLastName
    objDataUser.email= userEmail
    objDataUser.age= userAge
    objDataUser.password = userPass;
    console.log(objDataUser);
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