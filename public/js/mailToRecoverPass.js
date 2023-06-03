const mailToRecoverPassForm = document.querySelector(
  ".getMailToRecoverPassForm"
);
const messageToUser = document.getElementById('messageToUser')


if (mailToRecoverPassForm instanceof HTMLFormElement) {
  mailToRecoverPassForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const dataForm = new FormData(mailToRecoverPassForm);
    const userMail = dataForm.get("email");
    const mailToSend = {};
    mailToSend.email = userMail;
    console.log(mailToSend);
    try {
      fetch("api/sessions/mailToRecoverPass", {
        method: "POST",
        body: JSON.stringify(mailToSend),
        headers: { "content-type": "application/json" },
      })
        .then((result) => {
          console.log(result);
          if (result.status === 200) {
            messageToUser.innerText = `Please check your email to continue resetting your password`;
          } else if (result.status === 401) {
            alert("invalid mail. Try Again");
          } else if (result.status === 404) {
            alert("invalid Mail. Try Again");
          }
        })
    } catch (error) {
      console.error(`Error:`, error);
    }
  });
}
