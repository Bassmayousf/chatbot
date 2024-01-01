const sendBtn = document.querySelector(".chat-input i");
const inputText = document.querySelector(".chat-input textarea");
const inputChat = document.querySelector(".chat-input")
let chatBox = document.querySelector(".chatbox");
let chatbotToggler = document.querySelector(".chatbot-toggler");
let chatbotCloseBtn = document.querySelector(".close-btn");
const inputInitHeight = inputChat.scrollHeight
let userMessage;
const API_KEY = "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";
const generateResponse = (incomingChatLi) => {
  const API_URL = "https://api.openai.com/v1/chat/completions";
  const messageElement = incomingChatLi.querySelector("p")
  const methods = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY} `,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: userMessage,
        },
      ],
    }),
  };
  fetch(API_URL, methods)
    .then((res) => res.json())
    .then((data) => {
      console.log( data.choices[0].message.content)
      messageElement.textContent = data.choices[0].message.content
    }).catch((error)=>{
      messageElement.textContent = "OOps!something went wrong ,please try again"

    }).finally(()=>{
      chatBox.scrollTo(0, chatBox.scrollHeight)

    })
};
const createChatLi = (message, className) => {
  const ChatLi = document.createElement("li");
  ChatLi.classList.add("chat", className);
  let chatContent =
    className === "outcoming"
      ? `  <p> </p>`
      : `<span class="toy-icon"><i class="fa-solid fa-headset" style="color: #fff;"></i></span>
  <p></p>`;
  ChatLi.innerHTML = chatContent;
  ChatLi.querySelector("p").textContent = message
  return ChatLi;
};
const hendleChat = () => {
  userMessage = inputText.value.trim();
  console.log(userMessage);
  inputChat.style.height = `${inputInitHeight}px`

  chatBox.append(createChatLi(userMessage, "outcoming"));
  chatBox.scrollTo(0, chatBox.scrollHeight)
  setTimeout(() => {
    const incomingChatLi = createChatLi("Thinking...", "incoming")
    chatBox.append(incomingChatLi);
    chatBox.scrollTo(0, chatBox.scrollHeight)
    inputText.value = ""
    generateResponse(incomingChatLi);
  }, 600);
};
sendBtn.addEventListener("click", hendleChat);
chatbotToggler.addEventListener("click",()=>{
  document.body.classList.toggle("show-chatbot")
})
chatbotCloseBtn.addEventListener("click",()=>{
  document.body.classList.toggle("show-chatbot")
})
inputChat.addEventListener("input",()=>{
  inputChat.style.height = `${inputInitHeight}px`
  inputChat.style.height = `${inputChat.scrollHeight}px`
})
inputChat.addEventListener("keyup",(e)=>{
  if(e.key ==="Enter" && !e.shiftKey && window.innerWidth > 800){
    e.preventDefault();
    hendleChat()
  }
})