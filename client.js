const socket = io();
const form = document.getElementById('messageForm');
const input = document.getElementById('messageInput');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('chat message', input.value);
  input.value = '';
});

socket.on('chat message', (msg) => {
  const item = document.createElement('li');
  item.textContent = msg;
  document.getElementById('messages').appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});