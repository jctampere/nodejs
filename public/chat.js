window.onload = function() {
    var messages = [];
    var socket = io.connect('http://localhost:3700');
    var field = document.getElementById('field');
    var sendButton = document.getElementById('send');
    var content = document.getElementById('content');
    var name = document.getElementById('name');

    socket.on('message', function (data) {
        if(data.message) {
            messages.push(data);
            var html = '';
            for (var i=0; i<messages.length; i++) {
                html += messages[i].name ? messages[i].name + ': ' : '';
                html += messages[i].message + '<br />';
            }
            content.innerHTML = html;
        } else {
            console.log("some problem", data);
        }
    });

    sendButton.onclick = sendMessage = function () {
        if(name.value===''){
            console.log("enter name");
        } else {
            var text = field.value;
            console.log(text);
            socket.emit('send', {message: text, name: name.value});
            field.value='';
        }
    };
}

$(document).ready(function() {
    $('#field').keyup(function(e) {
       if (e.keyCode == 13) {
           sendMessage();
       }
    });
});