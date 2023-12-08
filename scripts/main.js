import { Product } from "./product.js";
import { ProductManager } from "./productManager.js";
import { deleteProduct, editProduct } from "./mainAction.js";

// Instanciamos el botón "Atrás" para su posterior uso
let backButton;

//Instanciamos el productManager

const productManager = new ProductManager();
updateInventoryTable();

//Evento relativo al formulario

document.getElementById('product-form-events').addEventListener('submit', function (event) {

    event.preventDefault();

    //Obtiene los valores del formularioid:,

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

//Función para actualizar la tabla del inventario

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
        deleteProduct(element, productManager, inventoryTable, updateInventoryTable);
    });

    //Evento para editar un producto

    document.getElementsByName('edit-product').forEach(element => {
        editProduct(element, productManager, inventoryTable, updateInventoryTable);
    });


    //Evento para buscar un producto

    document.getElementById('search-button').addEventListener('click', function (event) {
        event.preventDefault();
        const productName = document.getElementById('search-product').value;
        const product = productManager.searchProductByName(productName);
        if (product && productName !== '') {
            console.log(product);
            inventoryTable.innerHTML = `
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

            //Evento para eliminar un producto

            document.getElementsByName('delete-product').forEach(element => {
                deleteProduct(element, productManager, inventoryTable, updateInventoryTable);
            });

            //Evento para editar un producto

            document.getElementsByName('edit-product').forEach(element => {
                editProduct(element, productManager, inventoryTable, updateInventoryTable);
            });

            // Crear el botón "Atrás" si no existe
            if (!document.getElementById('back-button')) {
                backButton = document.createElement('button');
                backButton.textContent = 'Atrás';
                backButton.id = 'back-button';
                backButton.className = 'back-button';
                

                // Agregar el botón
                document.body.appendChild(backButton);

                // Agregar el evento
                backButton.addEventListener('click', function (event) {
                    event.preventDefault();
                    updateInventoryTable();

                    // Ocultar/eliminar el botón
                    backButton.remove();
                });
            }

        } else {
            alert('Producto no encontrado');
        }
        
    })
};
