const chat = document.getElementById("chat");

function sendMessage() {
  const input = document.getElementById("userInput");
  if (!input.value) return;

  addMsg(input.value, "user");

  setTimeout(() => {
    addMsg("I am Emily. I am ready.", "ai");
  }, 600);

  input.value = "";
}

function addMsg(text, cls) {
  const div = document.createElement("div");
  div.className = `msg ${cls}`;
  div.innerText = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function togglePanel() {
  document.getElementById("panel").classList.toggle("hidden");
}
