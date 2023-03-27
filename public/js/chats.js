const socket = io.connect();


socket.on('emailMensaje', data => {
    loadChats(data)
})

function loadChats (data) {
    console.log("privado")
    console.log(data)
    const html = data.forEach((elem) => {
        return(`
            <div class="message">
                <span class="user">${elem.email}</span>
                <span class="time">${elem.date}</span>
                <span class="text">${elem.text}</span>
            </div>
            `)
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
}
;

socket.on('messages', function(data) { render(data); });

function render(data) {
    console.log("todo")
    const html = data.chatDenormalized.mensajes.map((elem) => {
        return(`
            <div class="message">
                <span class="user">${elem.email}</span>
                <span class="time">${elem.date}</span>
                <span class="text">${elem.text}</span>
            </div>
            `)
    }).join(" ");
    const porcentajeCompresion = `<h4 style="color:blue" >Centro de Mensajes(compresion %${data.compr}) </h4>`
    document.getElementById('messages').innerHTML = html;
    document.getElementById('compresion').innerHTML = porcentajeCompresion
}



document.getElementById('formChat').addEventListener('submit', (e) => {
    e.preventDefault()
    agregarMensaje()
})

function agregarMensaje() {
    const nuevoMensaje = {
        email: document.getElementById('emailUser').innerHTML,
        text: document.getElementById('textoMensaje').value,
    }

    socket.emit("messegesNew",nuevoMensaje)
}
