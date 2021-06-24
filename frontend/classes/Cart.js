import Product from "./Product.js";

export default class Cart {
    constructor() {
        let cartFromStorage = localStorage.getItem('cart');
        this.contact = {};
        this.total = 0;
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
            this.total = total;
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
        let cartLength = Object.keys(this.content).length;
        console.log(cartLength);
        if(cartLength >= 1) {
            this.form();
        }

    }

    // Intégration du formulaire
    form() {

        // Création du formulaire de validation
        const formDiv = this._createWithClasses('div', ['col-9', 'border', 'p-5', 'my-5', 'bg-light']);

        // Titre du formulaire
        const formTitle= this._createWithClasses('h2', ['display-4', 'my-5']);
        formTitle.innerText = 'Formulaire de commande';
        // Nom de famille
        const surnameLabel = this._createWithClasses('label', ['form-label']);
        const surnameInput = this._createWithClasses('input', ['form-control']);
        surnameInput.setAttribute('type', "text");
        surnameInput.id = 'lastname';
        surnameInput.setAttribute('required', '');
        surnameLabel.innerText = 'Nom *';

        // Prénom
        const firstnameLabel = this._createWithClasses('label', ['form-label']);
        const firstnameInput = this._createWithClasses('input', ['form-control']);
        firstnameInput.setAttribute('type', "text");
        firstnameInput.id = 'firstname';
        firstnameInput.setAttribute('required', '');
        firstnameLabel.innerText = 'Prénom *';

        // email
        const emailLabel = this._createWithClasses('label', ['form-label']);
        const emailInput = this._createWithClasses('input', ['form-control']);
        emailInput.setAttribute('type', "email");
        emailInput.id = 'email';
        emailInput.setAttribute('required', '');
        emailLabel.innerText = 'Email *';

        // address
        const addressLabel = this._createWithClasses('label', ['form-label']);
        const addressInput = this._createWithClasses('input', ['form-control']);
        addressInput.setAttribute('type', "text");
        addressInput.id = 'address';
        addressInput.setAttribute('required', '');
        addressLabel.innerText = 'Adresse *';

        // city
        const cityLabel = this._createWithClasses('label', ['form-label']);
        const cityInput = this._createWithClasses('input', ['form-control']);
        cityInput.setAttribute('type', "text");
        cityInput.id = 'city';
        cityInput.setAttribute('required', '');
        cityLabel.innerText = 'Ville *';

        // Btn validation
        const btnValidation = this._createWithClasses('button', ['btn', 'btn-success']);
        btnValidation.setAttribute('type', "submit");
        btnValidation.innerText = "Valider la commande";

        // Intégration au HTML
        formDiv.appendChild(formTitle);
        formDiv.appendChild(surnameLabel);
        formDiv.appendChild(surnameInput);
        formDiv.appendChild(firstnameLabel);
        formDiv.appendChild(firstnameInput);
        formDiv.appendChild(emailLabel);
        formDiv.appendChild(emailInput);
        formDiv.appendChild(addressLabel);
        formDiv.appendChild(addressInput);
        formDiv.appendChild(cityLabel);
        formDiv.appendChild(cityInput);
        formDiv.appendChild(btnValidation);
        document.getElementById('contact-form').appendChild(formDiv);

        btnValidation.addEventListener("click", (evt) => {
            this.contact = {
                firstName : firstnameInput.value,
                lastName : surnameInput.value,
                address : addressInput.value,
                city : cityInput.value,
                email : emailInput.value,
            };
            evt.preventDefault();
            // Récupération des informations du formulaire
            this.submit(this.contact);

        })
    }

    // Test du contenu du formulaire

    emailtest() {
        const errorMsg = document.getElementById('form-error');
        const emailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (this.contact.email.match(emailformat)) {
            return true;
        } else {
            errorMsg.style.display = "block";
            const errorEmail = this._createWithClasses('p', ['text-danger']);
            errorEmail.innerText = "Tu n'as pas saisi une adresse email valide.";
            errorMsg.appendChild(errorEmail);
            return false;
        }
    }

    namestest() {
        const errorMsg = document.getElementById('form-error');
        // Test nom et prénom
        let letter = /^[a-zA-Z]+$/;
        if (this.contact.firstName.match(letter) && this.contact.lastName.match(letter)) {
            return true;
        } else {
            errorMsg.style.display = "block";
            const errorNames = this._createWithClasses('p', ['text-danger']);
            errorNames.innerText = "Tu as saisie des caractères non-autorisés dans le champs nom ou prénom. Merci de ne saisir uniquement des lettres dans ces champs.";
            errorMsg.appendChild(errorNames);
            return false;
        }
    }

    //Récupération de l'id de commande renvoyée par l'API et stockage dans le localStorage
    getOrderConfirmationId(responseId) {
        let orderId = responseId.orderId;
        console.log(orderId);
        localStorage.setItem("OrderId", orderId);
    }

    // Soumission du formulaire
    async submit(contact) {
        document.getElementById('form-error').innerHTML = '';
        let products = [];
        let productId = Object.keys(this.content);
        productId.forEach(element => products.push(element.substr(0, 24)));
        let dataToSend = JSON.stringify({ contact, products });
        let emailIsValid = this.emailtest();
        let namesIsValid = this.namestest();

        if(emailIsValid && namesIsValid) {
            try {
                console.log(dataToSend);
                console.log(products);
                let response = await fetch("http://localhost:3000/api/teddies/order", {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: dataToSend
                });
                if (response.ok) {
                    let responseId = await response.json();
                    this.getOrderConfirmationId(responseId);
                    window.location.href = "confirmation.html?total=" + this.total;
                    console.error(responseId);
                } else {
                    console.error('Retour du serveur : ', response.status);
                }
            } catch (e) {
                console.log(e);
            }

        }
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
        const productKey = product._id + product.color;

        if(this.content[productKey].quantity <= 1) {
            delete this.content[productKey];
        } else {
            this.content[productKey].quantity --;
        }
        this._updateStorage();
        document.location.reload();
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