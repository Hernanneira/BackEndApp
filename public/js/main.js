let cart = [];
let products = []
let quantityCart = '';
//productos


fetch('https://backenddevhernan.onrender.com/productos/api/v1',{
    method: 'GET',
    headers: new Headers({ 'Content-type': 'application/json'}),
    mode: 'no-cors'
})
    .then(response => response.json())
    .then(data =>{
        products = data
        if(products.length > 0) {
            products.forEach(element => {
                const addProduct = document.getElementById(`addProduct-${element.id_articulo}`)
    
                addProduct.addEventListener('click', (e) => {
                    e.preventDefault
                    const product = addToCart(element)
                    if (product.quantity > 0) {
                        document.getElementById(`product-${element.id_articulo}`).setAttribute("style","background-color:aquamarine")
                    }
                    totalQuantityItems(cart)
                })
                
                const deleteProduct = document.getElementById(`delProduct-${element.id_articulo}`)
    
                deleteProduct.addEventListener('click', (e) => {
                    e.preventDefault
                    const prod = deleteInCart(element)
                    if (prod.quantity == 0) {
                        document.getElementById(`product-${element.id_articulo}`).removeAttribute("style")
                    }
                    totalQuantityItems(cart)
                })
            })
        }
    })



    //sumar y restar en index
    


if (document.getElementById('preBuy')) {
    document.getElementById('preBuy').addEventListener('click', (e) => {
        e.preventDefault
        if (cart.length !== 0){
            fetch('http://https://backenddevhernan.onrender.com/api/v1/cart', {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(cart)
            })
            window.location = 'http://https://backenddevhernan.onrender.com/carrito';
        }
    })
}




function addToCart (prod) {
    let cantidadServicio = cart.find(carrito => carrito.id_articulo === prod.id_articulo)
    if (cantidadServicio) {
        cantidadServicio.quantity = 1
    } else {
        prod.quantity = 1
        cart.push(prod)
    }
    return prod
}

function deleteInCart (prod) {
    let cantidadServicio = cart.find(carrito => carrito.id_articulo === prod.id_articulo)
    let indice = cart.indexOf(cantidadServicio)
    if (cantidadServicio.quantity == 1){
        cantidadServicio.quantity--
        cart.splice(indice, 1)
    }
    return prod
}

function totalQuantityItems (cart) {
    if(cart.length !== 0) {
        document.getElementById('quantity').innerHTML =  `Items Seleccionados: ${cart.length}`;
    }else {
        document.getElementById('quantity').innerHTML = ''
    }
}

