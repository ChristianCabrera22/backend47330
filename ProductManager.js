const { promises: fs } = require('fs');

class ProductManager {
  constructor() {
    this.path = "./products.json" //ruta de mi archivo
  }

  async getProducts() {
      try {
        let archivo = await fs.readFile(this.path,"utf-8");
        return archivo
      } catch (error) {
        console.error('Error', error.message)
      }
    }

    async addProduct(addProduct) {
      if (!addProduct) {
          console.log("Error, data required")
      } else {
        let archivo = await fs.readFile(this.path,"utf-8")
        let products = JSON.parse(archivo)
      let product = products.find(prod => prod.code === addProduct.code) //verifica si el codigo esta en la db
      if (product) {
          return console.log("invalid code, existing")
      } else {
          addProduct.id= products.length+1
          products.push(addProduct)
          await fs.writeFile(this.path, JSON.stringify(products, null, 2), "utf-8")
          console.log("Product add")
      }
      }
  }
    async getProductById(id) {
      if (id) { 
      let archivo = await fs.readFile(this.path,"utf-8")
      let products = JSON.parse(archivo)
      let product = products.find(prod => prod.id === id)
      return product ? product : ""
      } else {
        console.log("Error, required ID")
      }
    }

    async deleteProduct(id) {
      if (id) {
      let archivo = await fs.readFile(this.path,"utf-8")
      let products = JSON.parse(archivo)
      const index = products.findIndex((product) => product.id === id);
      if (index !== -1) {
        products.splice(index, 1);
        await fs.writeFile(
          this.path,
          JSON.stringify(products, null, 2),
          "utf-8"
        );
        console.log("Product deleted by ID:",id)
      } else {
        console.log("invalid or no found ID:",id)
      }
    } else {
      console.log("Error, required ID")
    }
    }

    async updateProduct(id, updates) {
      if (!id || !updates){
        console.log("Error, data required")
      } else {
      let archivo = await fs.readFile(this.path,"utf-8")
      let products = JSON.parse(archivo)
      let product = products.find(prod => prod.id === id)
      if (product) {
        let productsUpdated = products.map((ele)=>{
          if(ele.id==id) {
            updates.id=id
            return updates
          } else {
            return ele
          }
        })
        await fs.writeFile(this.path, JSON.stringify(productsUpdated, null, 2), "utf-8")
    } else {
        console.log("ID no found:",id)
    }
    }
  }
}

let productManager = new ProductManager();
// Test:
// productManager.getProducts()
//   .then((result) => {
//     console.log("Products in db: ", result);
//   })
//   .catch((error) => {
//     console.error('Error', error.message);
//   });



  const test = async () => {
    try {
      const productManager = new ProductManager();

      // Title ...getProducts:
       const products = await productManager.getProducts();
      console.log('All products: ', products); 


      // Title ... getProductById: test id 2
      /* const productByID = await productManager.getProductById(2);
      productByID ? console.log('Products: ', productByID) : console.log("ID No found") */

      // Title ... addProduct(objeto)
      // const AddProduct = await productManager.addProduct({title: "TestTitle", description: "Testdescription",price: 450,thumbnail: "imgTest.jpg",code: "Code123",stock: 10});

      // Title ... deleteProduct(id)
      // const productByID = await productManager.deleteProduct(8);

      // Title ... updateProduct(id, updates)
      // const upProd = await productManager.updateProduct(8, {title: "TestTitleUPDATED", description: "TestDescriptionUPDATE",price: 999,thumbnail: "imgTestUPDATE.jpg",code: "Code123UPDATE",stock: 99})

    } catch (error) {
      console.error('Error: ', error.message);
    }
  };

  test();