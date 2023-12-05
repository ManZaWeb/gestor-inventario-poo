import { ProductManager } from "./productManager.js";
import { Product } from "./product.js";

//Instancia el administrador de productos

const productManager = new ProductManager();

// Evento relativo al formulario

document.getElementById('form').addEventListener('submit', function(event){
    event.preventDefault();

    //Obtiene los valores del formulario
    const id = document.getElementById('id').value;
    const nombre = document.getElementById('nombre').value;
    const precio = document.getElementById('precio').value;
    const cantidad = document.getElementById('cantidad').value;

    //Crea un nuevo producto
    const product = new Product(id, nombre, precio, cantidad);

    //Agrega el producto a la lista
    productManager.addProduct(product);

    //Muestra los productos
    productManager.showProducts();

    //Limpia el formulario
    document.getElementById('form').reset();
});