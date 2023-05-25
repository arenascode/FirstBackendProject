
const socket = io()

let chatBubble = document.createElement("div");

  
socket.on('Welcome', async (welcomeMessage) => {

  chatBubble = document.createElement("div");
  chatBubble.className = "bubble";
  chatBubble.innerHTML = welcomeMessage;
  
  chatbox.appendChild(chatBubble);
})

async function sendMessage() {
    var message = document.getElementById("message").value;
    var chatbox = document.getElementById("chatbox");

    chatBubble.className = "bubble";
    chatBubble.innerHTML += `<hr> ${message} `;

    chatbox.appendChild(chatBubble);

    // Lógica adicional para enviar el mensaje al servidor o realizar otras acciones
  socket.emit('response', message)

  document.getElementById("message").value = ""; // Limpiar el campo de entrada
  }