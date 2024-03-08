const http = require('http');

var options = Object();
var url = 'http://devices.webofthings.io/pi/actuators/display/';

options.headers = { "Accept": "application/json" };

http.get(url, options, (resp) => {
    let data = '';

    resp.on('data', (chunk) => {
        data += chunk;
    });

    resp.on('end', () => {
        console.log(JSON.parse(data));
    });
})