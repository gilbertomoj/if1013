var http = require("http");

http.createServer(function(req,res){
res.writeHeader(200, {
    "Content-Type":"text/event-stream",
    "Cache-Control":"no-cache", 
    "Connection":"keep-alive", 
    "Access-Control-Allow-Origin": "*"
});

var interval = setInterval(async function() {
    const resp = await fetch('http://devices.webofthings.io/pi/sensors/temperature/', {
        headers:{
          accept: 'application/json',
        }
      });

    const json = await resp.json()
    res.write("data: " + json.value + "\n\n");
    }, 2000);
}).listen(9090);
console.log('SSE-Server started!');

function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

// Efetue alterações na aplicação servidora construída anteriormente no exercício da
// aula de HTTP/REST para que cada recurso envie atualizações da temperatura através
// de Server-sent events. Note que existem pequenos detalhes tanto na requisição quanto
// na resposta (ex: qual tipo de conteúdo o cliente deve requisitar para obter server-sent
// events?)
// Sua URL deverá tanto responder à requisições diretamente no browser como a
// requisições feitas através do objeto EventSource.
// Você terá certeza que está funcionando se adaptar a questão 4 acima para testar o
// objeto EventSource usando qualquer URL do seu servidor HTTP/REST.