var http = require("http");
var port = 8686;
var xml = require('xml');


function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

http.createServer(async function (req, res) {
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
            // faz o request pra http://devices.webofthings.io/pi/sensors/temperature/
            const ress = await fetch('http://devices.webofthings.io/pi/sensors/temperature/', {
                headers:{
                  accept: 'application/json',
                }
              });
            const json = await ress.json()
            // const temperature = client('http://devices.webofthings.io/pi/sensors/temperature/')
            const temperature = json.value
            response(res, {temperature : unit(temperature), unit: url[1].split('=')[1].toUpperCase()})
            break;
        case '/light':
            const lightResponse = await fetch('http://devices.webofthings.io/pi/actuators/display/', {
                headers:{
                  accept: 'application/json',
                }
              });
            const jsonLightResponse = await lightResponse.json()
            const light = jsonLightResponse.properties.brightness.value
            // faz o request pra http://devices.webofthings.io/pi/actuators/display/
            response(res, {light : light})
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

// function client(url) {
//     var options = Object();
//     options.headers = { "Accept": "application/json" };

//     http.get(url, options, (resp) => {
//         let data = '';
    
//         resp.on('data', (chunk) => {
//             data += chunk;
//         });
    
//         resp.on('end', () => {
//             temperature = JSON.parse(data).value
//             console.log(temperature)
//             return JSON.parse(data).value;
//         });
//     })
// }

console.log('Server listening on http://localhost:' + port);
