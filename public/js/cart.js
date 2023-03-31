let cart = []

let output = document.getElementById('trCartTable')

fetch('http://localhost:8080/api/v1/cart')
    .then(response => response.json())
    .then(data =>{
        cart = data
        console.log(cart)
        if(cart.length > 0) {
            cart.forEach(element => {
            console.log("estamos")
            output.innerHTML += `
            <tr>
                <td> ${element.id_articulo}</td>
                <td> ${element.title}  </td>
                <td>  ${element.price}  </td>
                <td> <img src=" ${element.thumbnail}" alt=" ${element.title} " width="25"/> </td>
                <td> <button class="btn btn-outline-success" id="addProduct-${element.id_articulo}">+</button> <button class="btn btn-outline-danger" id="delProduct-${element.id_articulo}">-</button></td>
                <td>  ${element.quantity}  </td>
            </tr>`
            })
            cart.forEach(element => {
                const addProduct = document.getElementById(`addProduct-${element.id_articulo}`)
    
                addProduct.addEventListener('click', (e) => {
                    e.preventDefault
                    const product = addToCart(element)
                    console.log('cart',cart)
                    console.log('producto',product)
                    if (product.quantity > 0) {
                        document.getElementById(`product-${element.id_articulo}`).setAttribute("style","background-color:aquamarine")
                    }
                    totalQuantityItems(cart)
                })
                
                const deleteProduct = document.getElementById(`delProduct-${element.id_articulo}`)
    
                deleteProduct.addEventListener('click', (e) => {
                    e.preventDefault
                    const prod = deleteInCart(element)
                    console.log('cart',cart)
                    console.log('producto',prod)
                    if (prod.quantity == 0) {
                        document.getElementById(`product-${element.id_articulo}`).removeAttribute("style")
                    }
                    totalQuantityItems(cart)
                })
            })
        }
    })

    function addToCart (prod) {
        let cantidadServicio = cart.find(carrito => carrito.id_articulo === prod.id_articulo)
        if (cantidadServicio) {
            cantidadServicio.quantity++
            console.log('cantidadServicio',cantidadServicio)
        } else {
            prod.quantity = 1
            console.log('prod.quantity',prod.quantity)
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
        if (cantidadServicio.quantity > 1) {
            cantidadServicio.quantity--
            console.log('cantidadServicio',cantidadServicio.quantity)
        }
        return prod
    }

    if (document.getElementById('deleteAll')) {
        document.getElementById('deleteAll').addEventListener('click', (e) => {
            e.preventDefault
            cart = []
            fetch('http://localhost:8080/api/v1/cart', {
            method: 'DELETE',
            })
            .then(res => res.json()) 
            .then(res => console.log(res))
        })
    }