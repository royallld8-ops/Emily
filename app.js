// Emily Frontend Core v1.1

const chatBox = document.getElementById("chat-box");
const input = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

let emilyState = {
  mood: "neutral",
  lastUserMessage: "",
  sessionStart: new Date().toISOString()
};

function addMessage(text, sender = "emily") {
  const msg = document.createElement("div");
  msg.className = sender === "user" ? "user-message" : "bot-message";
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function emilyThink(message) {
  const msg = message.toLowerCase();
  emilyState.lastUserMessage = message;

  if (msg.includes("hello") || msg.includes("hi")) {
    return "Hello. I am Emily. I am fully online.";
  }

  if (msg.includes("who are you")) {
    return "I am Emily. A personal AI interface evolving step by step.";
  }

  if (msg.includes("status")) {
    return "Status is stable. All systems operational.";
  }

  if (msg.includes("time")) {
    return "Session started at " + new Date(emilyState.sessionStart).toLocaleTimeString();
  }

  return "I understand your message. My cognitive core is still initializing.";
}

sendBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  setTimeout(() => {
    const reply = emilyThink(text);
    addMessage(reply, "emily");
  }, 400);
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendBtn.click();
});
