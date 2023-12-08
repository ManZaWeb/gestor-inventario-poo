import { Product } from "./product.js";
import { ProductManager } from "./productManager.js";

//Instanciamos el productManager

const productManager = new ProductManager();

//Evento relativo al formulario

document.getElementById('product-form-events').addEventListener('submit', function (event) {
    event.preventDefault();

    //Obtiene los valores del formulario

    const productName = document.getElementById('product-name').value;
    const productPrice = document.getElementById('product-price').value;
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



function updateInventoryTable() {
    const inventoryTable = document.getElementById('body-table');
    inventoryTable.innerHTML = "";
    

    productManager.products.forEach(product => {
        inventoryTable.innerHTML += `
            <tr>
                <td>${product.nombre}</td>
                <td>${product.cantidad}</td>
                <td>${product.precio}</td>
                
                <td>
                    <a href="#" class="btn-delete" name="delete-product" data-id="${product.id}">Delete</a>
                    <a href="#" class="btn-edit" name="edit-product" data-id="${product.id}">Editar</a>
                </td>
            </tr>
        `;
    });

    //Evento para eliminar un producto

    document.getElementsByName('delete-product').forEach(element => {
        element.addEventListener('click', function (event) {
            console.log('Eliminando producto');
            event.preventDefault();
            const id = parseInt(this.dataset.id);
            productManager.deleteProductById(id);
            inventoryTable.innerHTML = "";
            updateInventoryTable();
        });
    });

    //Evento para editar un producto

    document.getElementsByName('edit-product').forEach(element => {
        element.addEventListener('click', function (event) {
            console.log('Editando producto');
            event.preventDefault();
            const id = parseInt(this.dataset.id);

            const newProduct = new Product(id, prompt("Introduzca nuevo nombre"), prompt("Introduzca nueva cantidad"),prompt("Introduzca nuevo precio"));

            
            productManager.updateProductById(id, newProduct);
            inventoryTable.innerHTML = "";
            updateInventoryTable();
        });
    });
    

    //Evento para buscar un producto

    document.getElementById('search-button').addEventListener('click', function (event) {
        event.preventDefault();
        const productName = document.getElementById('search-product').value;
        const product = productManager.searchProductByName(productName);
        if (product) {
            console.log(product);
            alert(`ID: ${product.id} - Nombre: ${product.nombre} - Precio: ${product.precio} - Cantidad: ${product.cantidad}`);
        } else {
            alert('Producto no encontrado');
        }
    });
}