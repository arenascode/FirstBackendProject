
// Get Html Elements
const changeRoleForm = document.getElementById('changeRoleForm')
const userId = document.querySelector('button[data-userid]').dataset.userid


if (changeRoleForm instanceof HTMLFormElement) {
  
  async function changeUserRole(e) {
    e.preventDefault()
    const dataForm = new FormData(changeRoleForm)
    const roleSelected = dataForm.get('userRole')
    if (roleSelected === 'chooseRole') return alert('this is not valid role')
    const dataToSend = {
      role: roleSelected
    }
    try {
      const response = await fetch(`${userId}`, {
      method: "PUT",
      body: JSON.stringify(dataToSend),
      headers: { "Content-Type": "application/json" }
    })
    if (!response.ok) {
      throw new Error('Error request. Try again')
    }
    const data = await response.json()
      alert(`the user's role was succesfully changed to ${data.role}`)
      location.reload()
    } catch (error) {
      alert(error.message)
    }
  }
  changeRoleForm.addEventListener('submit', changeUserRole)
}