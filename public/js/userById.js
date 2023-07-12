// Get Html Elements
const changeRoleForm = document.getElementById("changeRoleForm");
const userId = document.querySelector("button[data-userid]").dataset.userid;
const deleteUserBtn = document.querySelector("button[data-usertodelete]");

// ---- Change User Role Function ---- //
if (changeRoleForm instanceof HTMLFormElement) {
  async function changeUserRole(e) {
    e.preventDefault();
    const dataForm = new FormData(changeRoleForm);
    const roleSelected = dataForm.get("userRole");
    if (roleSelected === "chooseRole") return alert("this is not valid role");
    const dataToSend = {
      role: roleSelected,
    };
    try {
      const response = await fetch(`${userId}`, {
        method: "PUT",
        body: JSON.stringify(dataToSend),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Error request. Try again");
      }
      const data = await response.json();
      alert(`the user's role was succesfully changed to ${data.role}`);
      location.reload();
    } catch (error) {
      alert(error.message);
    }
  }
  changeRoleForm.addEventListener("submit", changeUserRole);
}

// --- Delete User Function ---//
async function deleteUser(e) {
  e.preventDefault();
  if (confirm("Are You Sure You Want To Delete This User?")) {
    console.log(`Yes I wanto to delete it`);
    try {
      const response = await fetch(`${userId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Error request. Please Try Again");
      }
      console.log(response);
      alert("The User Was Sucessfully Deleted");
      location.reload()
    } catch (error) {
      alert(error.message);
    }
  }
}

deleteUserBtn.addEventListener("click", deleteUser);
