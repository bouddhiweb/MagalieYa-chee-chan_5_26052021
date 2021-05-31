export default class Cards {
    /**
     * @desc Intègre les données dans la classe photo
     * @param {Object} cardsData
     * @param {ObjectID} cardsData.id
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

        const card = this._createWithClasses('div', ['card']);
        const img = this._createWithClasses('img', ['card-img-top']);
        img.src = this.url;
        img.alt = this.title;
        card.appendChild(img);

        const cardBody = this._createWithClasses('div', ['card-body']);//
        const cardTitle= this._createWithClasses('h5', ['card-title']); //

        cardTitle.innerText = this.title;
        cardBody.appendChild(cardTitle);
        card.appendChild(cardBody);

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