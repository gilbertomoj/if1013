var WebSocketServer = require('ws').Server;
wss = new WebSocketServer({port: 8080, path: '/testing'});
wss.on('connection', function(ws) {
    var messageData = ""
    ws.on('message', function(message) {
        console.log('Msg received in server: %s ', message);
        messageData = message
    });
    console.log('new connection');
    ws.send('Msg from server' + messageData);
});