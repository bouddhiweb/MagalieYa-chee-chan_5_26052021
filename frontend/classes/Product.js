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
        this.select = this._createWithClasses('select', ['form-select', 'form-select-lg', 'mb-3']);
        this.select.id = 'select-color';
        this.chosenColor = this.select.value;
        Object.assign(this, productData);
    }

    display(mode) {
        //Switch Affichage complet / vignette

        switch (mode) {
            case 'thumbnail' :
                const card = this._createWithClasses('div', ['card', 'col-sm', 'm-3', 'bg-light', 'border']);
                const img = this._createWithClasses('img', ['card-img-top', 'transformation']);
                img.src = this.imageUrl;
                img.alt = this.name;
                card.appendChild(img);

                const cardBody = this._createWithClasses('div', ['card-body']);
                const cardTitle= this._createWithClasses('h5', ['card-title']);
                const cardDescription= this._createWithClasses('p', ['card-text', 'text-truncate']);
                const cardPrice = this._createWithClasses('p', ['fs-3','text-end','px-2']);
                const cardBtnCart= this._createWithClasses('button', ['btn','btn-primary', 'my-3']);

                //Choix de la couleur de l'ours en peluche
                const colors = this.colors;
                colors.forEach(color => {
                    const cardOptionsColors = this._createWithClasses('option', ['option-color']);
                    cardOptionsColors.value = color;
                    cardOptionsColors.innerText = color;
                    this.select.appendChild(cardOptionsColors);

                });

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
                cardBody.appendChild(this.select);
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

                //Choix de la couleur de l'ours en peluche
                const fullcolors = this.colors;


                fullcolors.forEach(color => {
                    const fullOptionsColors = this._createWithClasses('option', ['option-color']);
                    fullOptionsColors.value = color;
                    fullOptionsColors.innerText = color;
                    this.select.appendChild(fullOptionsColors);
                });

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
                productBody.appendChild(this.select);
                productBody.appendChild(productPrice);
                productBody.appendChild(productBtnCart);

                document.getElementById('product-img').appendChild(imgFull);
                document.getElementById('product-info').appendChild(productInfo);
                break;

            case 'cart' :
                console.log('affichage panier');

                // Affichage du contenu du panier

                let mainCart = document.getElementById('cart-content');

                let divCart = this._createWithClasses('tr', ['lead']);
                //Ajouter attribut ID
                mainCart.appendChild(divCart);

                let nameTeddy = this._createWithClasses('td', ['lead']);
                let colorTeddy = this._createWithClasses('td', ['lead']);
                let priceTeddy = this._createWithClasses('td', ['lead']);
                let QuantityTeddy = this._createWithClasses('td', ['lead']);

                divCart.appendChild(nameTeddy);
                divCart.appendChild(colorTeddy);
                divCart.appendChild(priceTeddy);
                divCart.appendChild(QuantityTeddy);

                nameTeddy.textContent = this.name;
                colorTeddy.textContent = this.color;
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
        let teddiesChoosen = {
            _id: this._id,
            name: this.name,
            color: this.select.value,
            quantity: this.quantity,
            price: this.price
        };
        cart.add(teddiesChoosen);

    }
}