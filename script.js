//Elements
const chatBubbleBtn = document.getElementById('chat-bubble-btn');
const chatWidget = document.getElementById('chat-widget');
const messagesEl = document.getElementById('chat-messages');
const formEl = document.getElementById('chat-form');
const inputEl = document.getElementById('chat-input');
const sendBtn = document.getElementById('chat-send');

chatWidget.style.display = 'none';

chatBubbleBtn.addEventListener('click', () =>{
    const isHidden = (chatWidget.style.display === 'none' || chatWidget.style.display === '');
    chatWidget.style.display = isHidden ? 'flex' : 'none';
    
        if (isHidden && !chatWidget.dataset.welcomed) {
            appendMessage('bot', "Hello! How can I assist you today?", 'Chatbot');
            chatWidget.dataset.welcomed = '1';
        }

    //Function who add a message
    function appendMessage(author, text) {
        const msg = document.createElement('div');
        msg.classList.add('message', author.toLowerCase());
        msg.innerHTML = `
        <div class="bubble">${text}</div>
        <div class="meta">${author} • ${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
    `;
    document.getElementById('chat-messages').appendChild(msg);
    document.getElementById('chat-messages').scrollTop = document.getElementById('chat-messages').scrollHeight;
    } 
});

// OD TEGO MIEJSCA NAPISAĆ OD NOWA - MOŻNA PONIŻSZE USUNĄĆ!!!

// --- Helpers ---
function formatTime(d = new Date()) {
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}



