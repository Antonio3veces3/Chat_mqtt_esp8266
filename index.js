const client  = mqtt.connect('wss://test.mosquitto.org:8081/mqtt')

let mensaje = document.getElementById('mensaje');
let topic = document.getElementById('topic');
let btnSend = document.getElementById('send');
let divMensajes = document.getElementById('mensajes');
olList = document.querySelector('ol');

btnSend.addEventListener('click', ()=>{
    let mnsj = mensaje.value;
    let tema = topic.value;
    if( mnsj != '' && tema != ''){
        client.publish(`carg/${tema}`, mnsj);
        mensaje.value = "";
        topic.value = "";
    }else{
        alert('Llena todos los campos');
    }
    
});

function mensajeEvent (topic, message){
    const item = document.createElement('li');

    item.innerHTML = `<b>${topic}</b> : ${message}`;
    item.classList.add('list-group-item');

    olList.append(item);
}

function reconectar(){
    console.log('Reconnecting...');
}


client.on('connect', () => {
    console.log('Conectado');
    client.subscribe('carg/#', function (err) {
       if (!err) {
          //client.publish('carg/hola', 'Hello mqtt');
        }else{
            console.log(err);
        }
    });
})

client.on('message', mensajeEvent)
client.on('reconnect', reconectar)

