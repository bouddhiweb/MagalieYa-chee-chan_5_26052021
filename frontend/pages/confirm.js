import Confirm from "../classes/Confirm.js";

if(localStorage.cart) {
    const confirm = new Confirm();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const totalOrder = urlParams.get('total');

    confirm.ConfirmationOrder(totalOrder);
} else {
    document.location.href = "index.html";
}

