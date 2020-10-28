const socket = io();

let output = document.getElementById('output');
let message = document.getElementById('message');
let btn = document.getElementById('send');
let actions = document.getElementById('actions');

btn.addEventListener('click', ()=>{
    const mensaje = message.value;
    message.valuegit  = '';
    socket.emit('chat:message', {
        message: mensaje,
        username: username
    });
});

message.addEventListener('keypress', function(){
    socket.emit('chat:typing', username);
});

socket.on('chat:message', function(data){
    actions.innerHTML = '';
    output.innerHTML += `<p>
    <strong>${data.username}</strong>: ${data.message}
    </p>`
});

socket.on('chat:typing', function(data){

    actions.innerHTML = `<p><em>${data} is typing a message</em></p>`

});