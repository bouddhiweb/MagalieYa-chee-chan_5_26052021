import Product from "./Product.js";

export default class Cart {
    constructor(productData) {
        /**
         * @desc Intègre les données dans la classe cards
         * @param {Object} productData
         * @param {string} productData._id
         * @param {string} productData.name
         * @param {number} productData.price
         * @param {string} productData.description
         * @param {string} productData.imageUrl
         */
        Object.assign(this, productData);

    }

    /////////////////////////////MISE EN PLACE DU PANIER///////////////////////////////////////////////////////

    add(product) {
        console.log("C'est ajouté", product);
        const itemId = product._id;
        let cartContent = JSON.parse(localStorage.getItem(itemId));
        if (cartContent === null) {
            cartContent = [];
        }

        const itemName = product.name;
        const itemPrice = product.price/100;
        const keyName = itemId+'name';
        const keyPrice = itemId+'price';
        localStorage.setItem(keyName, itemName);
        localStorage.setItem(keyPrice, itemPrice);
    }

    displayCart(product, itemId, itemName) {
        for (let i = 0; i < localStorage.length; i++) {
            console.log(localStorage);
            itemName = localStorage.getItem(localStorage.key(i));
            itemPrice = localStorage.getItem(localStorage.key(i));

            let mainCart = document.getElementById('cart-content');
            mainCart.classList.add("my-3");

            let divCart = this._createWithClasses('div', ['CartContentToClear', "d-flex", "flex-row", "justify-content-between", "my-2", "px-1", "bold"]);
            //Ajouter attribut ID
            mainCart.appendChild(divCart);

            let priceTeddy = this._createWithClasses('p', ['price']);
            let nameTeddy = this._createWithClasses('p', ['bold']);

            divCart.appendChild(nameTeddy);
            nameTeddy.textContent = itemName;
            divCart.appendChild(priceTeddy);
            priceTeddy.textContent = itemPrice + ' €';
        }

    }


    empty() {
        const emptyCart = () => {
            localStorage.clear();
        }
        let emptyCartBtn = document.getElementById('btn-clear-cart');
        emptyCartBtn.addEventListener("click", emptyCart());

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
}