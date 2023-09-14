var stompClient = null

function Send(){
    let ob = {message:$('#msg').val()}
    stompClient.send("/app/sendMsg", {}, JSON.stringify(ob));
}

function Connect(){
    let socket = new SockJS('/server1')

    stompClient = Stomp.over(socket)

    stompClient.connect({}, function(frame) {
        console.log("Connected: "+frame);
        stompClient.subscribe('/topic/sendTo', function (message){
            ShowMessage(JSON.parse(message.body));
        });
    });
}

function ShowMessage(message){
    var newRow = $('<tr></tr>');
    newRow.append("<td>" + message.message + "</td>");

    $('#show-msg').append(newRow);
}

function disconnect(){
    if(stompClient !== null){
        stompClient.disconnect();
    }
    alert("Disconnected")
}

$(document).ready((e)=>{
    $('#msg').hide();
    $('#send-msg').hide();
    $('#dis-btn').hide();

    $('#cnt-btn').click(function(){
        $(this).hide(0, function(){
            Connect();
            $('#msg').show();
            $('#send-msg').show();
            $('#dis-btn').show();
        });
    });

    $('#send-msg').click(()=>{Send();});

    $('#dis-btn').click( function(){
        $(this).hide(0, function(){
            disconnect();
            $('#msg').hide();
            $('#send-msg').hide();
            $('#cnt-btn').show();
        });
    });
});