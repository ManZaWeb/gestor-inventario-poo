import { ProductManager } from "./productManager.js";
import { Product } from "./product.js";

//Instancia el administrador de productos

const productManager = new ProductManager();

// Evento relativo al formulario

document.getElementById('product-form-events').addEventListener('submit', function(event){
    event.preventDefault();

    //Obtiene los valores del formulario
    
    const productName = document.getElementById('product-name').value;
    const productPrice = document.getElementById('product-precio').value;
    const productQuantity = parseInt(document.getElementById('product-quantity').value);

    //Crea un nuevo producto

    const newProduct = new Product(Date.now(), productName, productPrice, productQuantity);

    console.log(newProduct);

    //Agrega el nuevo producto al administrador de productos

    productManager.addProduct(newProduct);

    //Limpia el formulario

    this.reset();

    //Actualiza la tabla del inventario

    updateInventoryTable();
    
});

