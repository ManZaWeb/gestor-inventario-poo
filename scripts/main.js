import { ProductManager } from "./productManager.js";
import { Product } from "./product.js";

//Instancia el administrador de productos

const productManager = new ProductManager();

// Evento relativo al formulario

document.getElementById('product-form-events').addEventListener('submit', function(event){
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

//Metodo para actualizar la tabla del inventario

function updateInventoryTable(){
    const inventoryTable = document.getElementById('body-table');
    inventoryTable.innerHTML = "";

    productManager.products.forEach(product => {
        inventoryTable.innerHTML += `
            <tr>
                <td>${product.nombre}</td>
                <td>${product.precio}</td>
                <td>${product.cantidad}</td>
                <td>
                    <a href="#" class="btn btn-danger" name="delete-product" data-id="${product.id}">Delete</a>
                </td>
            </tr>
        `;
    });

    //Evento para eliminar un producto

    document.getElementsByName('delete-product').forEach(element => {
        element.addEventListener('click', function(event){
            event.preventDefault();
            const id = parseInt(this.dataset.id);
            productManager.deleteProductById(id);
            updateInventoryTable();
        });
    });
}

//Metodo para buscar un producto

document.getElementById('search-button').addEventListener('click', function(event){
    event.preventDefault();
    const searchInputValue = document.getElementById('search-product').value;
    const searchResult = productManager.searchProductByName(searchInputValue);
    console.log(searchResult);
    const searchInput = document.getElementById('search-product');
    searchInput.innerHTML += `${searchResult.nombre}`;
});

