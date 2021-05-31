export default class Cards {
    /**
     * @desc Intègre les données dans la classe photo
     * @param {Object} cardsData
     * @param {string} cardsData.id
     * @param {string} cardsData.name
     * @param {number} cardsData.price
     * @param {string} cardsData.description
     * @param {string} cardsData.imageUrl
     */
    constructor(cardsData) {
        Object.assign(this, cardsData);
    }

    display() {
        //Construction du DOM de l'image

        const card = this._createWithClasses('div', ['card', 'bg-light', 'border']);
        const img = this._createWithClasses('img', ['card-img-top', 'transformation']);
        img.src = this.imageUrl;
        img.alt = this.name;
        card.appendChild(img);

        const cardBody = this._createWithClasses('div', ['card-body', 'ps-3']);
        const cardTitle= this._createWithClasses('h5', ['card-title']);
        const cardDescription= this._createWithClasses('p', ['text-sm-start']);
        const cardPrice = this._createWithClasses('p', ['fs-3','text-end','px-2']);
        const cardBtnCart= this._createWithClasses('button', ['btn','btn-primary', 'my-3']);
        const cardBtnPage= this._createWithClasses('button', ['btn','btn-light']);

        cardTitle.innerText = this.name;
        cardBtnPage.innerText = 'Voir fiche produit';
        cardBtnCart.innerText = 'Ajouter au panier';
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
    }

    /**
     * @param
     * @param
     * @private
     */

    _createWithClasses(tag, classes = []) {
        const elt = document.createElement(tag);
        classes.forEach(classe => elt.classList.add(classe));
        return elt;
    }
}