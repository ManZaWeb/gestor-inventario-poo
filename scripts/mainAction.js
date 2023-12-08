import {Product} from './product.js';

export function deleteProduct(element, productManager, inventoryTable, updateInventoryTable, backButton) {
    element.addEventListener('click', function (event) {
        console.log('Eliminando producto');
        event.preventDefault();
        const id = parseInt(this.dataset.id);
        productManager.deleteProductById(id);
        inventoryTable.innerHTML = "";
        updateInventoryTable();

        // Eliminar el botón "Atrás"
        let backButton = document.getElementById('back-button');
        if (backButton) {
            backButton.remove();
        }
    });
}

export function editProduct(element, productManager, inventoryTable, updateInventoryTable, backButton) {
    element.addEventListener('click', function (event) {
        console.log('Editando producto');
        event.preventDefault();
        const id = parseInt(this.dataset.id);

        const newProduct = new Product(id, prompt("Introduzca nuevo nombre"), prompt("Introduzca nueva cantidad"), prompt("Introduzca nuevo precio"));

        productManager.updateProductById(id, newProduct);
        inventoryTable.innerHTML = "";
        updateInventoryTable();

        // Eliminar el botón "Atrás"
        let backButton = document.getElementById('back-button');
        if (backButton) {
            backButton.remove();
        }
    });
}
