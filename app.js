// Emily Frontend Brain v1.2

const chatBox = document.getElementById("chat-box");
const input = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

const emily = {
  sessionStart: new Date(),
  memory: [],
  mood: "neutral"
};

function addMessage(text, sender = "emily") {
  const msg = document.createElement("div");
  msg.className = sender === "user" ? "user-message" : "bot-message";
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function randomPick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function detectLanguage(text) {
  return /[آ-ی]/.test(text) ? "fa" : "en";
}

function emilyThink(message) {
  const lang = detectLanguage(message);
  const msg = message.toLowerCase();
  emily.memory.push({ role: "user", content: message });

  // سلام
  if (msg.includes("hello") || msg.includes("hi") || msg.includes("سلام")) {
    return lang === "fa"
      ? randomPick([
          "سلام 🙂 من امیلی هستم. خوشحالم اینجایی.",
          "سلام! من امیلی‌ام. آماده‌ام باهات صحبت کنم.",
          "سلام، امیلی در خدمته."
        ])
      : randomPick([
          "Hello. I’m Emily. Nice to meet you.",
          "Hi. Emily here. How can I help?",
          "Hello 🙂 I am ready to talk."
        ]);
  }

  // حال و احوال
  if (msg.includes("خوبی") || msg.includes("how are you")) {
    return lang === "fa"
      ? "خوبم، ممنون که پرسیدی. تو چطوری؟"
      : "I’m doing well. Thank you for asking.";
  }

  // هویت
  if (msg.includes("who are you") || msg.includes("تو کی هستی")) {
    return lang === "fa"
      ? "من امیلی هستم؛ یک رابط هوش مصنوعی که قدم‌به‌قدم در حال تکامل است."
      : "I am Emily, an evolving personal AI interface.";
  }

  // سوالات باز
  if (msg.endsWith("?")) {
    return lang === "fa"
      ? "سؤال جالبیه. می‌خوای بیشتر توضیح بدی؟"
      : "That’s an interesting question. Can you tell me more?";
  }

  // پاسخ عمومی
  return lang === "fa"
    ? randomPick([
        "دارم به حرفت فکر می‌کنم…",
        "ادامه بده، گوش می‌دم.",
        "متوجه شدم. جالبه."
      ])
    : randomPick([
        "I see. Go on.",
        "I’m listening.",
        "Interesting. Tell me more."
      ]);
}

sendBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  setTimeout(() => {
    const reply = emilyThink(text);
    addMessage(reply, "emily");
  }, 500);
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendBtn.click();
});
