import Product from "./Product.js";

export default class Cart {
    constructor() {
        let cartFromStorage = localStorage.getItem('cart');
        if (cartFromStorage === null) {
            this.content = {};
            this._updateStorage();
        } else {
            this.content = JSON.parse(cartFromStorage);
        }

    }

    /////////////////////////////MISE EN PLACE DU PANIER///////////////////////////////////////////////////////

    /**
     *
     * @param {Product} product
     */
    add(product) {
        if(this.content[product._id + product.color] === undefined) {
            this.content[product._id + product.color] = product;
        } else {
            this.content[product._id + product.color].quantity ++;
        }
        this._updateStorage();
        console.log("C'est ajouté", this.content);
        console.log("La couleur", product.color);
    };

    display() {
        let total = 0;
        let quantity = 0;
        // Affichage des produits
        for(const [_id, productData] of Object.entries(this.content)) {
            const product = new Product(productData);
            total += product.price * product.quantity / 100;
            quantity += product.quantity ;
            console.log(_id, productData);
            product.display('cart');
        }
        // Affichage du total
        let totalCartDiv = document.getElementById('total-price');
        let totalCart = this._createWithClasses('p', ['lead', 'text-uppercase']);
        totalCartDiv.appendChild(totalCart);
        totalCart.innerText = total + ' €';

        // Affichage du nb de produit dans le panier
        let nbProductsDiv = document.getElementById('nb-product');
        let nbProducts = this._createWithClasses('p', ['lead', 'text-uppercase']);
        nbProductsDiv.appendChild(nbProducts);
        nbProducts.innerText = quantity;

        // Affichage du bouton "vider le panier"
        this.empty();

    }

    // Bouton pour vider le panier
    empty() {

        let emptyCart = document.getElementById('btn-clear-cart');

        let emptyCartBtn = this._createWithClasses('button', ['btn', 'btn-danger']);
        emptyCartBtn.textContent = 'Vider le panier';

        emptyCart.appendChild(emptyCartBtn);
        //Vider le panier
        const emptyStorage = () => {
            localStorage.clear();
            document.location.reload();
        }

        emptyCart.addEventListener("click", emptyStorage);

    }

    //Méthode qui nous permet de supprimer un produit du panier en cliquant sur un button grâce à son ID
    remove(product) {

        if(this.content[product._id + product.color].quantity <= 1) {
            let test = product._id + product.color;
            let cartFromStorage = localStorage.getItem('cart');
            let content = JSON.parse(cartFromStorage);
            delete content[test];
            localStorage.setItem('cart', JSON.stringify(content));
            document.location.reload();

        } else {
            this.content[product._id + product.color].quantity --;
            this._updateStorage();
            document.location.reload();
        }

    }

    _createWithClasses(tag, classes = []) {
        const elt = document.createElement(tag);
        classes.forEach(classe => elt.classList.add(classe));
        return elt;
    }

    _updateStorage() {
        localStorage.setItem('cart', JSON.stringify(this.content));
    }
}