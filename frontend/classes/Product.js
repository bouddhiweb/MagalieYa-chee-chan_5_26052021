import Cart from "./Cart.js";

export default class Product {
    /**
     * @desc Intègre les données dans la classe cards
     * @param {Object} productData
     * @param {string} productData._id
     * @param {string} productData.name
     * @param {number} productData.price
     * @param {string} productData.description
     * @param {string} productData.imageUrl
     */
    constructor(productData) {
        this.quantity = 1;
        Object.assign(this, productData);
    }

    display(mode) {
        //Switch Affichage complet / vignette
        switch (mode) {
            case 'thumbnail' :
                const card = this._createWithClasses('div', ['card', 'bg-light', 'border']);
                const img = this._createWithClasses('img', ['card-img-top', 'transformation']);
                img.src = this.imageUrl;
                img.alt = this.name;
                card.appendChild(img);

                const cardBody = this._createWithClasses('div', ['card-body', 'ps-3']);
                const cardTitle= this._createWithClasses('h5', ['card-title']);
                const cardDescription= this._createWithClasses('p', ['text-sm-start', 'text-truncate']);
                const cardPrice = this._createWithClasses('p', ['fs-3','text-end','px-2']);
                const cardBtnCart= this._createWithClasses('button', ['btn','btn-primary', 'my-3']);

                //création lien vers produit.html pour chaque section
                const cardBtnPage = this._createWithClasses('a', ['btn','btn-light']);
                cardBtnPage.href = "product.html?id=" + this._id;
                cardBtnPage.setAttribute('title', "L'ourson " + this.name + " vous attend !");

                cardTitle.innerText = this.name;
                cardBtnPage.innerText = 'Voir fiche produit';
                cardBtnCart.innerText = 'Ajouter au panier';
                cardBtnCart.addEventListener('click', this._onBtnClick.bind(this));
                cardPrice.innerText =this.price/100 + ' €';
                cardDescription.innerText = this.description;
                cardBody.appendChild(cardTitle);
                card.appendChild(cardBody);
                cardBody.appendChild(cardDescription);
                cardBody.appendChild(cardPrice);
                cardBody.appendChild(cardBtnCart);
                cardBody.appendChild(cardBtnPage);

                // Insertion dans le DOM conteneur (à la fin)

                document.getElementById('display-cards').appendChild(card);
                break;

            case 'full' :
                console.log('affichage full');
                //Image produit
                const imgFull = this._createWithClasses('img', ['img-full-display']);
                imgFull.src = this.imageUrl;
                imgFull.alt = this.name;

                // Informations produits

                const productInfo = this._createWithClasses('div', ['p-5','bg-light']);
                const productBody = this._createWithClasses('div', ['ps-3']);
                const productName = this._createWithClasses('h1', ['py-3','display-3']);
                const productDescription= this._createWithClasses('p', ['text-sm-start']);
                const productPrice = this._createWithClasses('p', ['fs-3','text-end','px-2']);
                const productBtnCart= this._createWithClasses('button', ['btn','btn-primary', 'my-3']);

                productName.innerText = "L'ourson " + this.name;
                productBtnCart.innerText = 'Ajouter au panier';
                productBtnCart.addEventListener('click', this._onBtnClick.bind(this));
                productPrice.innerText =this.price/100 + ' €';
                productDescription.innerText = this.description;
                productInfo.appendChild(productBody);
                productBody.appendChild(productName);
                productBody.appendChild(productDescription);
                productBody.appendChild(productPrice);
                productBody.appendChild(productBtnCart);

                document.getElementById('product-img').appendChild(imgFull);
                document.getElementById('product-info').appendChild(productInfo);
                break;

            case 'cart' :
                console.log('affichage panier');



                // Affichage du contenu du panier

                let mainCart = document.getElementById('cart-content');
                mainCart.classList.add("my-3");

                let divCart = this._createWithClasses('div', ["d-flex", "flex-row", "justify-content-between", "my-2", "px-1", "bold"]);
                //Ajouter attribut ID
                mainCart.appendChild(divCart);

                let nameTeddy = this._createWithClasses('p', ['bold']);
                let colorTeddy = this._createWithClasses('p', ['bold']);
                let priceTeddy = this._createWithClasses('p', ['bold']);
                let QuantityTeddy = this._createWithClasses('p', ['bold']);

                divCart.appendChild(nameTeddy);
                divCart.appendChild(priceTeddy);
                divCart.appendChild(QuantityTeddy);

                nameTeddy.textContent = this.name;
                priceTeddy.textContent = this.price / 100 + ' €';
                QuantityTeddy.textContent = this.quantity;

                break;

            default :
                throw 'mode ' + mode + ' non reconnu';
        }
    }

    _createWithClasses(tag, classes = []) {
        const elt = document.createElement(tag);
        classes.forEach(classe => elt.classList.add(classe));
        return elt;
    }

    _onBtnClick () {
        const cart = new Cart();
        cart.add(this);
    }
}