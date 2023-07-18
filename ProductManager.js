const fs = require('fs')

class ProductManager{
    constructor(path){
        this.path = path
    }

    async getProducts (){
        try {
            if (fs.existsSync(this.path)) {
              const infoArchivo = await fs.promises.readFile(this.path, 'utf-8')
              return JSON.parse(infoArchivo)
            } else {
              return []
            }
          } catch (error) {
            return error
          }
    }
    async addProduct(obj){
        try {
            const productPrev = await this.getProducts()
            let id
            if (!productPrev.length) {
              id = 1
            } else {
              id = productPrev[productPrev.length - 1].id + 1
            }
            productPrev.push({ ...obj, id })
            await fs.promises.writeFile(this.path, JSON.stringify(productPrev))
          } catch (error) {
            return error
          }
    }
    async getProductById(id){
        try {
            const productPrev = await this.getProducts()
            const producto = productPrev.find((p) => p.id === id)
            if (!producto) {
              return console.log("Id de producto no encontrado")
            }
            return console.log("Producto encontrado:", producto)
          } catch (error) {
            return error
          }
    }
    async updateProduct(id, obj){
        try {
            const productPrev = await this.getProducts()
            const productoIndex = productPrev.findIndex((p) => p.id === id)
            if (productoIndex === -1) {
              return 'No hay un producto con ese id'
            }
            const producto = productPrev[productoIndex]
            //const usuarioUpdate = {...producto,...obj}
            productPrev[productoIndex] = { ...producto, ...obj }
            await fs.promises.writeFile(this.path, JSON.stringify(productPrev))
          } catch (error) {
            return error
          }
    }
    async deleteProduct(id){
        try {
            const productPrev = await this.getProducts()
            const nuevoArregloProd = productPrev.filter((p) => p.id !== id)
            await fs.promises.writeFile(
              this.path,
              JSON.stringify(nuevoArregloProd)
            )
          } catch (error) {
            return error
          }
    }
}
const producto1 = {
    title:"producto 1",
    description: "Desc prod1",
    price:100,
    thumbnail:"nada",
    code:"prod1",
    stock:10
}
const producto2 = {
    title:"producto 2",
    description: "Desc prod2",
    price:200,
    thumbnail:"nada",
    code:"prod2",
    stock:20
}
const producto3 = {
    title:"producto 3",
    description: "Desc prod3",
    price:300,
    thumbnail:"nada",
    code:"prod3",
    stock:30
}


async function prueba() {
    const manager = new ProductManager("products.json")
    //console.log("Productos iniciales:", await manager.getProducts())
    //await manager.addProduct(producto1)
    //console.log("Prod ini + últimos agregados", await manager.getProducts())
    //await manager.getProductById(4)
    //await manager.deleteProduct(1)
    //await manager.updateProduct(3,{title: 'producto 3', price:300})
}
  
prueba()




