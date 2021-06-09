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
        if(this.content[product._id] === undefined) {
            this.content[product._id] = product;
        } else {
            this.content[product._id].quantity ++;
        }
        this._updateStorage();
        console.log("C'est ajouté", this.content);
    }

    display() {
        let total = 0;
        // Affichae des produits
        for(const [_id, productData] of Object.entries(this.content)) {
            const product = new Product(productData);
            total += product.price * product.quantity / 100;
            console.log(_id, productData);
            product.display('cart');
        }
        // Affichage du total
        console.log(total);
        let totalCartDiv = document.getElementById('total-price');
        let totalCart = this._createWithClasses('p', ['bold']);
        let lenghtCart = this._createWithClasses('p', ['bold']);
        totalCartDiv.appendChild(totalCart);
        totalCart.textContent = 'Total :' + total + ' €';
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

    delete(product) {
        //TODO:compléter cette méthode pour supprimer un élément du panier
    }

    cartLength() {
        const cartLength= this._createWithClasses('p', ['badge', 'rounded-pill', 'bg-danger']);
        cartLength.innerText = localStorage.length;
        document.getElementById('cart-lenght').appendChild(cartLength);
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