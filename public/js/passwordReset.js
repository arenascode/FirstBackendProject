const resetPassForm = document.querySelector(".passResetForm");
console.log(resetPassForm);

const password = document.getElementById("loginPassword");
const repeatPassword = document.getElementById("repeatPassword");

repeatPassword.addEventListener("input", (e) => {
  e.preventDefault();
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

if (resetPassForm instanceof HTMLFormElement) {
  resetPassForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const userData = document.getElementById("resetPass");
    const userId = userData.dataset.id;
    const userToken = userData.dataset.tkn;
    // console.log(`${userId}, ${userToken}`);
    const dataForm = new FormData(resetPassForm);
    const newPass = dataForm.get("loginPassword");
    const repeatUserPass = dataForm.get("repeatPassword");
    if (newPass === repeatUserPass) {
      const dataTransfer = {
        userId: userId,
        userToken: userToken,
        newUserPass: newPass,
      };
      console.log(`I'm dataToSendToServer ${JSON.stringify(dataTransfer)}`);

      fetch("http://localhost:8080/api/sessions/resetPassword", {
        method: "POST",
        body: JSON.stringify(dataTransfer),
        headers: { "Content-type": "application/json" },
      })
        .then((response) => {
          console.log(response);
          if (response.status == 200) {
            alert(`Your password was restored`);
            window.location.href = "/profile";
          } else if (response.status == 400) {
            response.json().then((data) => {
              alert(`${data.errorMsg}`)
            })
          }
        })
    } else {
      alert(`the passwords doesn't match`);
    }
    //resetPassForm.reset()
  });
}
