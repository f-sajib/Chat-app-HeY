const socket = io()

let username;
let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message__area');

do {
    username = prompt('Please Enter Your Name: ')
} while(!username)

textarea.addEventListener('keyup', (e) => {
    if(e.key === "Enter") sendMessage(e.target.value)
})


/**
 * Send message 
 */
function sendMessage(text) {
    let msg = {
        user: username,
        message: text.trim()
    }

    appendMessage(msg,'outgoing');
    textarea.value = '';
    socket.emit('message',msg);
}

/**
 * Append message 
 */
function appendMessage(msg,type) {
    if (!msg.message.length) {
        return;
    }

    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className,'message')

    let markUp = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markUp;
    messageArea.appendChild(mainDiv)
    scrollToBottom();
}

/**
 * Recive message
 */
 socket.on('message', (msg) => {
    appendMessage(msg,'incoming');
})

/**
 * Scroll to bottom message
 */

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}