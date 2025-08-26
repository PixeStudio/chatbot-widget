//Elements
const chatBubbleBtn = document.getElementById('chat-bubble-btn');
const chatWidget = document.getElementById('chat-widget');
const messagesEl = document.getElementById('chat-messages');
const formEl = document.getElementById('chat-form');
const inputEl = document.getElementById('chat-input');
const sendBtn = document.getElementById('chat-send');

chatWidget.style.display = 'none';

// --- Helpers ---
    function formatTime(d = new Date()) {
        return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    function scrollToBottomSmooth() {
        messagesEl.scrollTo({ top: messagesEl.scrollHeight, behavior: 'smooth' });
       }

     //Function who add a message
    function appendMessage(side, text, authorLabel) {
       const msg = document.createElement('div');
       msg.className = `message from-${side}`;
       
       const bubble = document.createElement('div');
       bubble.className = 'bubble';
       bubble.textContent = text;

       const meta = document.createElement('div');
       meta.className = 'meta';
       meta.textContent = `${authorLabel} | ${formatTime()}`;

       msg.appendChild(bubble);
       msg.appendChild(meta);
       messagesEl.appendChild(msg);

       scrollToBottomSmooth();
    }

// --- Toggle widget and default welcome info
chatBubbleBtn.addEventListener('click', () =>{
    const isHidden = (chatWidget.style.display === 'none' || chatWidget.style.display === '');
    chatWidget.style.display = isHidden ? 'flex' : 'none';
    
        if (isHidden && !chatWidget.dataset.welcomed) {
            appendMessage('bot', "Hello! How can I assist you today?", 'Chatbot');
            chatWidget.dataset.welcomed = '1';
        }
});

function autosize(el) {
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 9 * 16) + 'px';
} 
inputEl.addEventListener('input', () => autosize(inputEl));
autosize(inputEl);

inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        formEl.requestSubmit();
    }
});

let sending = false;

formEl.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (sending) return;

  const text = (inputEl.value || '').trim();
  if (!text) return;

  // 1) user message
  appendMessage('user', text, 'Quest');

  // 2) clear textarea
  inputEl.value = '';
  autosize(inputEl);

  // 3) lock UI
  sendBtn.disabled = true;
  sending = true;

  try {
    // pseudo-opóźnienie (np. 700ms), żeby zasymulować serwer
    await new Promise(r => setTimeout(r, 700));
    // prosta pseudo-logika odpowiedzi
    const reply = `You wrote: "${text}". How else can I help?`;
    appendMessage('bot', reply, 'Chatbot');
  } catch (err) {
    appendMessage('bot', 'Sorry, something went wrong.', 'Chatbot');
  } finally {
    sendBtn.disabled = false;
    sending = false;
    inputEl.focus();
  }
});



