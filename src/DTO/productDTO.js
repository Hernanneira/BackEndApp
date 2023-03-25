//nico 

class ProductoDto {
    constructor({ id_articulo, title, price, thumbnail, quantity }) {
        this.id_articulo = id_articulo,
        this.title = title,
        this.price = price,
        this.thumbnail = thumbnail,
        this.quantity = quantity
    }
}

function asDto(productos){
    if(Array.isArray(productos)){
        return productos.map(productos => new ProductoDto(productos))
    } else {
        return new ProductoDto(productos)
    }
}

module.export = { asDto, ProductoDto }