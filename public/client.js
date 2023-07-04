const socket = io();
let name;
let textarea = document.querySelector("#textarea");
let messageArea = document.querySelector(".message__area")

do{
    name = prompt("please enter you name");
}while(!name);
// -------------------------------------------
socket.emit('userJoined', name);
// -------------------------------------------
textarea.addEventListener('keyup', (e)=>{
    if(e.key == 'Enter'){
        sendMessage(e.target.value);
    }
})

function sendMessage(message){
    let msg = {
        user : name,
        message : message.trim()
    }

    //append
    appendMessage(msg, 'outgoing');
    scrollToBottom();
    textarea.value = "";

    //send to server
    socket.emit('message', msg);
}

function appendMessage(msg, type){
    let mainDiv = document.createElement('div');
    mainDiv.className = type
    mainDiv.classList.add('message');
    
    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</h4>
    `
    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv);

}


//receving message
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming');
    scrollToBottom();
})

socket.on('userJoined', (name)=>{
    let mainDiv = document.createElement('div');
    mainDiv.classList.add('info');

    let markup = `${name} has joined the chat`;
    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv);
    console.log(`${name} has joined the chat`);
})

function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight;
}