console.log(`Hello world!!`);

// fetch("api/sessions/profile")
//   .then((response) => response.json())
//   .then((user) => {
//     sessionStorage.setItem('user', JSON.stringify(user))
//   })
//   .catch((error) => console.error(error));

// localStorage.getItem('user')
  
// const savedUser = sessionStorage.getItem("user");

// if (savedUser) {
//   const usuario = JSON.parse(savedUser);
//   const profileRender = document.getElementById('profileRender')
//   profileRender.innerHTML = `
//   <h1>Welcome!</h1>
//     <p>User: ${usuario.email}</p>
//     <p>Nombre: ${usuario.name}</p>
//     <p>Role: ${usuario.role}</p>
//     <a href="/logout"><button>Salir</button></a>
//     <h4><a href="/api/products">View Our Products</a> </h4>`
// } else {
//   console.log("No hay datos del usuario guardados en sessionStorage");
//   // hacer algo si no se encuentran datos del usuario en sessionStorage
// }