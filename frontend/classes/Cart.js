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
        this.form();
    }

    // Intégration du formulaire
    form() {
        // Création du formulaire de validation
        const formDiv = this._createWithClasses('div', ['col-9']);

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

        btnValidation.addEventListener("click", (evt, contact) => {
            // Récupération des informations du formulaire
            contact = {
                lastname : surnameInput.value,
                firstname : firstnameInput.value,
                email : emailInput.value,
                address : addressInput.value,
                city : cityInput.value,
            };
            evt.preventDefault();
            console.log(contact);
            this.emailtest(contact);
            this.namestest(contact);
            console.log(this.emailtest(contact));
            console.log(this.namestest(contact));
        })
    }

    // Test du contenu du formulaire

    emailtest(contact) {
        const errorMsg = document.getElementById('form-error');
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(contact.email)) {
            return true;
        } else {
            errorMsg.style.display = "block";
            const errorEmail = this._createWithClasses('p', ['text-danger']);
            errorEmail.innerText = "Tu n'as pas saisi une adresse email valide.";
            errorMsg.appendChild(errorEmail);
            return false;
        }
    }

    namestest(contact) {
        const errorMsg = document.getElementById('form-error');
        // Test nom et prénom
        let letter = /^[a-zA-Z]+$/;
        if (contact.firstname.match(letter) && contact.lastname.match(letter)) {
            console.log(contact.firstname + ' ' + contact.lastname);
            return true;
        } else {
            errorMsg.style.display = "block"
            const errorNames = this._createWithClasses('p', ['text-danger']);
            errorNames.innerText = "Tu as saisie des caractères non-autorisés dans le champs nom ou prénom. Merci de ne saisir uniquement des lettres dans ces champs.";
            errorMsg.appendChild(errorNames);
            return false;
        }
    }


    // Soumission du formulaire
    submit(evt) {
        evt.preventDefault();
        /*
                if() {

                } else {
                    window.alert("Le formulaire n'a pas été rempli correctement.")
                }
        */
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