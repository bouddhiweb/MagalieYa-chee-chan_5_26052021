export default class Confirm {
    constructor() {
        this.cartContent = JSON.parse(localStorage.cart);
    }

// Confirmation de la commande

    ConfirmationOrder(total) {

        const confirmationId = localStorage.getItem("OrderId");
        const messageConfirmation = document.getElementById("orderId");
        messageConfirmation.innerHTML = "Merci pour votre commande <br> n° " + confirmationId;

        const summary = document.getElementById("summary-order");

        // On créé les balises de la div
        let listOrdered = this._createWithClasses('ol', ['list-group-numbered', 'col-6']);


        let totalPrice = this._createWithClasses('p', ['lead']);
        let endMsg = this._createWithClasses('p', ['lead']);
        let backToIndex = this._createWithClasses('a', ['btn', 'btn-warning']);

        // On remplit les tags créé au dessus

        totalPrice.innerHTML = "Prix total : " + total + " €";
        endMsg.innerHTML = "A bientôt chez Orinoco !";
        backToIndex.setAttribute('href', 'index.html');
        backToIndex.innerHTML = "Retour à la page d'accueil";

        summary.appendChild(listOrdered);


        console.log(Object.keys(this.cartContent));

        Object.keys(this.cartContent).forEach(key => {
            console.log(key, this.cartContent[key]);
            console.log(this.cartContent[key].name);
            let listOrderedElt = this._createWithClasses('li', ['list-group-item','d-flex', 'justify-content-between','align-items-start']);
            let listTeddyOrdered= this._createWithClasses('div', ['ms-2','me-auto']);
            let listQuantityOrdered= this._createWithClasses('span', ['badge','bg-primary','rounded-pill']);

            listTeddyOrdered.innerText = this.cartContent[key].name + " en couleur " + this.cartContent[key].color;
            listQuantityOrdered.innerText = this.cartContent[key].quantity;

            listOrderedElt.id = this.cartContent[key]._id;
            listTeddyOrdered.id = this.cartContent[key]._id + this.cartContent[key].name;
            listQuantityOrdered.id = this.cartContent[key]._id + this.cartContent[key].quantity;

            listOrdered.appendChild(listOrderedElt);
            listOrderedElt.appendChild(listTeddyOrdered);
            listOrderedElt.appendChild(listQuantityOrdered);
        });

        summary.appendChild(totalPrice);
        summary.appendChild(endMsg);
        summary.appendChild(backToIndex);

        setTimeout(this.emptyStorage, 2000);

    }

    _createWithClasses(tag, classes = []) {
        const elt = document.createElement(tag);
        classes.forEach(classe => elt.classList.add(classe));
        return elt;
    }
    emptyStorage() {
        localStorage.clear();
    }
}