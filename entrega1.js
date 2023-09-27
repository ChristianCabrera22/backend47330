class ProductManager {

    constructor() {
        this.Products = []; //base de datos productos (db)
    }
    addProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Error, all fields are required")
        } else {
        let product = this.Products.find(prod => prod.code === code) //verifica si el codigo esta en la db
        if (product) {
            return console.log("invalid code, existing")
        } else {
            this.Products.push(
            {
                id: this.Products.length + 1,
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            })
            console.log("Product add")
        }
        }
    }

    getProducts() {
        return this.Products
    }

    getProductById(id) {
        let product = this.Products.find(prod => prod.id === id)
        if (!product) {
            console.log("Product not found")
        }else {
            console.log("product id:",id,product)
        }
    }
}

let productManager = new ProductManager();




//Test:
console.log("Products in db: ",productManager.getProducts());
//formato: (title, description, price, thumbnail, code, stock)
productManager.addProduct("prod1", "test1", 10, "img12.jpg", "prod2Test1", 11)
productManager.addProduct("prod2", "test2", 20, "img13.jpg", "prod3Test1", 12)
productManager.addProduct("prod3", "test3", 30, "img14.jpg", "prod4Test1", 13)
productManager.addProduct("prod4", "test4", 40, "img15.jpg", "prod5Test1", 14)




console.log("Products in db: ",productManager.getProducts());
productManager.getProductById(2);