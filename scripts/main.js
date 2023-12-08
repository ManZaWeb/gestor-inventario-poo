import { Product } from "./product.js";
import { ProductManager } from "./productManager.js";

let backButton;
//Instanciamos el productManager

const productManager = new ProductManager();

let discos = [
    {id: 1, nombre: "Thriller - Michael Jackson", cantidad: 5, precio: 20 },
    {id: 2, nombre: "The Dark Side of the Moon - Pink Floyd", cantidad: 10, precio: 15 },
    {id: 3, nombre: "Abbey Road - The Beatles", cantidad: 15, precio: 25 },
    {id: 4, nombre: "Rumours - Fleetwood Mac", cantidad: 20, precio: 30 },
    {id: 5, nombre: "Back in Black - AC/DC", cantidad: 25, precio: 18 },
    {id: 6, nombre: "The Wall - Pink Floyd", cantidad: 30, precio: 22 },
    {id: 7, nombre: "Led Zeppelin IV - Led Zeppelin", cantidad: 35, precio: 28 },
    {id: 8, nombre: "A Night at the Opera - Queen", cantidad: 40, precio: 32 },
    {id: 8, nombre: "Hotel California - Eagles", cantidad: 45, precio: 35 },
    {id: 10, nombre: "Born to Run - Bruce Springsteen", cantidad: 50, precio: 40 },
];

// Añadimos los discos de forma individual

discos.forEach(product => {
    productManager.addProduct(product);
});

updateInventoryTable()



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

            const newProduct = new Product(id, prompt("Introduzca nuevo nombre"), prompt("Introduzca nueva cantidad"), prompt("Introduzca nuevo precio"));


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
                element.addEventListener('click', function (event) {
                    console.log('Eliminando producto');
                    event.preventDefault();
                    const id = parseInt(this.dataset.id);
                    productManager.deleteProductById(id);
                    inventoryTable.innerHTML = "";
                    // Ocultar/eliminar el botón
                    backButton.remove();
                    updateInventoryTable();
                });
            });

            //Evento para editar un producto

            document.getElementsByName('edit-product').forEach(element => {
                element.addEventListener('click', function (event) {
                    console.log('Editando producto');
                    event.preventDefault();
                    const id = parseInt(this.dataset.id);

                    const newProduct = new Product(id, prompt("Introduzca nuevo nombre"), prompt("Introduzca nueva cantidad"), prompt("Introduzca nuevo precio"));


                    productManager.updateProductById(id, newProduct);
                    inventoryTable.innerHTML = "";
                    // Ocultar/eliminar el botón
                    backButton.remove();
                    updateInventoryTable();
                });
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
