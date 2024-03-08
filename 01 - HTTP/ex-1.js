var http = require("http");
var port = 8686;
var xml = require('xml');

function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

http.createServer(function (req, res) {
    console.log('New incoming client request for ' + req.url);
    const url = req.url.split('?')
    const response = (res, message) => {
        return req.headers.responsetype === 'json' ? sendJsonResponse(res, message) : sendHtmlResponse(res, message)
    }
    const unit = (temp) =>{
        return url[1].split('=')[1] === 'c' ? temp : (temp * 9/5) + 32  
    } 

    res.writeHeader(200, { 'Content-Type': 'application/json' }); //#A
    
    switch (url[0]) { //#B
        case '/temperature':
            response(res, {temperature : unit(randomInt(1, 40)), unit: url[1].split('=')[1].toUpperCase()})
            break;
        case '/light':
            response(res, {light : randomInt(1, 100)})
            break;
        default:
            response(res, { "hello": "World" })
    }

    res.end();
}).listen(port);

function sendJsonResponse(res, message) {
    console.log("teste")
    res.write(JSON.stringify(message))
}

function sendHtmlResponse(res, message) {
    res.write(xml(message))
}

console.log('Server listening on http://localhost:' + port);
