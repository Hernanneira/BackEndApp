let cart = []

const output = document.getElementById('trCartTable')
const headTable = document.getElementById('cartTable')
const doCart = document.getElementById('doCart')
const nonCart = document.getElementById(`cart`)


const render = () => {
    
    fetch('http://localhost:8080/api/v1/cart')
    .then(response => response.json())
    .then(data => {
        cart = data
        console.log(cart)
        if(cart.length > 0) {
                headTable.innerHTML = `<thead>
                <tr>
                  <th scope="col">id</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Precio</th>
                  <th scope="col">Imagen</th>
                  <th scope="col">Agregar/Eliminar del Carrito</th>
                  <th scope="col">Cantidad</th>
                </tr>
                </thead>`
                cart.forEach(element => {
                headTable.innerHTML += 
                `<tr>
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
                render()
            })
            
            const deleteProduct = document.getElementById(`delProduct-${element.id_articulo}`)
        
            deleteProduct.addEventListener('click', (e) => {
                e.preventDefault
                const prod = deleteInCart(element)
                console.log('cart',cart)
                console.log('producto',prod)
                render()
            })
        })
        
            function addToCart (prod) {
                let cantidad = cart.find(carrito => carrito.id_articulo === prod.id_articulo)
                if (cantidad) {
                    cantidad.quantity++
                    console.log('cantidad',cantidad)
                }
                updateCart(cart)
                render()
                return prod
            }
            
            function deleteInCart (prod) {
                let cantidad = cart.find(carrito => carrito.id_articulo === prod.id_articulo)
                let indice = cart.indexOf(cantidad)
                if (cantidad.quantity == 1){
                    cantidad.quantity--
                    cart.splice(indice, 1)
                    updateCart(cart)
                }
                if (cantidad.quantity > 1) {
                    cantidad.quantity--
                  console.log('cantidadServicio',cantidad.quantity)
                  updateCart(cart)
                }
                render()
                return prod
              }
            } else {
                nonCart.innerHTML = `<h3>No se encontraron productos en tu carrito</h3>`
            }})
        }


render()



if (document.getElementById('deleteAll')) {
    document.getElementById('deleteAll').addEventListener('click', (e) => {
        e.preventDefault
        cart = []
        fetch('http://localhost:8080/api/v1/cart', {
        method: 'DELETE',
        })
        .then(res => res.json()) 
        .then(res =>{
            render()
            console.log(res)
        } )
    })
}

    function updateCart(product) {
        fetch(`http://localhost:8080/api/v1/cart`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(product)
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error))
      }