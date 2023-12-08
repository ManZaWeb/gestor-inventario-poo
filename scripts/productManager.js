import { Product } from "./product.js";
export class ProductManager{

    #products;

    constructor(){
        this.#products = [];
        this.getFromLocalStorage();
    }

    //Metodo para obtener la lista de productos
    listProducts(){
        return this.#products;
    }

    //Metodo para agregar un producto a la lista
    addProduct(product){
        this.#products.push(product);
        this.setToLocalStorage();
    }

    //Metodo para actualizar un producto de la lista
    updateProductById(id, updateProduct){
        const index = this.#products.findIndex(product => product.id === id);
        //Si no existe error (es coincidente el index)
        if(index !== -1){
            this.#products[index] = updateProduct;
            localStorage.removeItem(id);
            this.setToLocalStorage();
        }
        
    }

    //Metodo para eliminar un producto de la lista
    deleteProductById(id){
        const index = this.#products.findIndex(product => product.id === id);
        //Si no existe error (es coincidente el index)
        if(index !== -1){
            this.#products.splice(index, 1);
        }
    }

    //Metodo para mostrar todos los productos dentro del array
    showProducts(){
        for(const product of this.#products){
            console.log(`ID: ${product.id} - Nombre: ${product.nombre} - Precio: ${product.precio} - Cantidad: ${product.cantidad}`);
        };
    }

    

    //Metodo para buscar un producto por su ID
    searchProductByName(name){
        const product = this.#products.find(product => product.nombre.includes(name));
        return product;
    }

    setToLocalStorage() {
        this.#products.forEach(product => {
            localStorage.setItem(product.id, JSON.stringify(product.toJSON()));
        });
    }

    getFromLocalStorage() {
        const products = Object.keys(localStorage).map(key => {
            const data = JSON.parse(localStorage.getItem(key));
            return new Product(data.id, data.nombre, data.cantidad, data.precio);
        });
        this.#products = products;
    }

    //Getters y Setters

    get products(){
        return this.#products;
    }

    set products(products){
        this.#products = products;
    }

    
}