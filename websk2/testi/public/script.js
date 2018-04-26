//FRONTEND......................

let socket = io.connect('http://localhost:4200');

let message = document.getElementById('message');
let handle = document.getElementById('handle');
let output = document.getElementById('output');
let sendButton = document.getElementById('send');
let rules = document.getElementById('rules');

let myID = null;

// Emit events
sendButton.addEventListener('click', function() {

    console.log("handle", handle);

    if(message.value > 0 && message.value <= 10) {
        console.log("message.value: ", message.value);
        socket.emit('guess', {
            message: message.value,
            handle: handle.innerText,
            id: myID
        });
    } else {
        alert("Please only send numbers that are between 1 and 10!");
    }

});

socket.emit('start');

socket.on('guess', function(data) {
    output.innerHTML += '<p><stong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('start', function(data) {
    if(myID == null) {
        myID = data.id;
        console.log("myID: ", myID);
        handle.innerHTML += '<p>' + data.name + '</p>';
    }
});
