import { winstonLogger } from "../../src/utils/logger.js";

const formRegister = document.getElementById('registerForm')

const password = document.getElementById('loginPassword')
const repeatPassword = document.getElementById("repeatPassword");


repeatPassword.addEventListener("input", (e) => {
  e.preventDefault()
  const istheSamePassContainer = document.getElementById("isTheSamePass");
  if (password.value.length > 0 && repeatPassword.value.length > 0) {
    if (repeatPassword.value === password.value) {
    istheSamePassContainer.innerText = `The passwords match`;
  } else {
      istheSamePassContainer.innerText = `The passwords doesn't match`;
  }
  } else {
    istheSamePassContainer.innerText = ``;
}
});


if (formRegister instanceof HTMLFormElement) {
  formRegister.addEventListener('submit', (e) => {
    e.preventDefault()
    const dataUser = new FormData(formRegister)
    const userName = dataUser.get('name')
    const userLastName = dataUser.get('lastName')
    const userEmail = dataUser.get("email");
    const userAge = dataUser.get("age");
    const userPass = dataUser.get("loginPassword");
    const repeatUserPass = dataUser.get("repeatPassword");
    if (userPass === repeatUserPass) {
      
      const objDataUser = {}
      objDataUser.name= userName
      objDataUser.lastName= userLastName
      objDataUser.email= userEmail
      objDataUser.age= userAge
      objDataUser.password = userPass;
      
      fetch("/api/sessions/register", {
          method: "POST",
          body: JSON.stringify(objDataUser),
          headers: {
              "Content-Type": "application/json",
            },
          }).then((response) => {
              if (response.ok) {
                  alert('We are glad that you are part')
                  window.location.href='/login'
                }
              })
                .catch((error) => winstonLogger.error(error.message));
      } else {
            alert(`The passwords doesn't match`);
            } 
    formRegister.reset()
  })
}