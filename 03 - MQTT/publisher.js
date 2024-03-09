const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://broker.hivemq.com')
var interval = setInterval(() => {
    sendData()
    },2000)
    client.on('message', () => {
        console.log('message')
    }
)
function sendData()
{
console.log('publishing')
// COMPLETE COM O CÓDIGO NECESSÁRIO PARA PUBLICAR O DADO
// ALEATORIO UTILIZANDO O TOPICO sensores/voltagem
client.publish('sensores/voltagem',randomInt(0,100).toString())

console.log('published')
}
function randomInt (low, high) {
return Math.floor(Math.random() * (high - low) + low);
}