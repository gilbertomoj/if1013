var http = require("http");

http.createServer(function(req,res){
res.writeHeader(200, {
    "Content-Type":"text/event-stream",
    "Cache-Control":"no-cache", 
    "Connection":"keep-alive", 
    "Access-Control-Allow-Origin": "*"
});

var interval = setInterval(async function() {
    var randomNumber = randomInt(0, 10000);
    res.write("data: " + randomNumber + "\n\n");
    }, 2000);
}).listen(9091);
console.log('SSE-Server started!');

function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

