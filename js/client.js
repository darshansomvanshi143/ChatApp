const socket = io("http://localhost:8000");
// Get DOM elements in respective Js variables!
const from = document.getElementById("send-container");
const messageInput = document.getElementById("messageInp");
const messageContainer = document.querySelector(".container");
//audio will play on recieving messages
var audio = new Audio("ting.mp3");
//Function which will append event info to the container
const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("message");
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
  if (position == "left") {
    audio.play();
  }
};

//if the form submitted, send server the message
from.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  append(`You: ${message}`, "right");
  socket.emit("send", message);
  messageInput.value = "";
});

//ask new user his/her name and let the server know
const name = prompt("Enter Your Name");
socket.emit("new-user-joined", name);

//if new user joined, receive his/her name from the server
socket.on("user-joined", (name) => {
  append(`${name} Joined The Chat`, "left");
});

//if server sends a message, receive it
socket.on("receive", (data) => {
  append(`${data.name}: ${data.message}`, "left");
});

//if the user leave from the chat, append info to the container
socket.on("left", (name) => {
  append(`${name} Left The Chat`, "left");
});
