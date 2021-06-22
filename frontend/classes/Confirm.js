export default class Confirm {
    constructor() {
    }

// Confirmation de la commande

    addConfirmationOrder(total) {
        console.log(total);
        const confirmationId = localStorage.getItem("orderConfirmationId");
        const messageConfirmation = document.getElementById("orderId");
        messageConfirmation.innerHTML = "Merci pour votre commande n° " + confirmationId;
        const confirmationPrice = document.getElementById("total-price");
        confirmationPrice.innerHTML = "Prix total : " + total + " €";
        console.log('localStorage');
        console.log(localStorage);
        localStorage.clear();
        console.log('localStorage');
        console.log(localStorage);
    }

}