
document.getElementById('saveP').addEventListener('click', (e) => {
    const nuevoProducto = {
        title: document.getElementById('title').value,
        price: document.getElementById('price').value,
        thumbnail: document.getElementById('thumbnail').value,
        category: document.getElementById('category').value
    }

    fetch('http://localhost:8080/nuevo', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(nuevoProducto)
    })
    .then(response => response.json())
    .then(response => console.log(response));

    // window.location = 'http://localhost:8080/productos';
})

document.getElementById('editP').addEventListener('click', (e) => {
    const producto = {
        id_articulo: document.getElementById('id_articulo').value,
        title: document.getElementById('title').value,
        price: document.getElementById('price').value,
        thumbnail: document.getElementById('thumbnail').value,
        category: document.getElementById('category').value
    }
    fetch('http://localhost:8080/nuevo', {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(producto)
    })
    .then(response => response.json())
    .then(response => console.log(response));
})

document.getElementById('delP').addEventListener('click', (e) => {
    const producto = {
        id: document.getElementById('id_articulo').value,
    }
    fetch('http://localhost:8080/nuevo', {
            method: "DELETE",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(producto)
    })
    .then(response => response.json())
    .then(response => console.log(response));
})
