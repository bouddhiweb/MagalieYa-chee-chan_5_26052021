import Confirm from "../classes/Confirm.js";

const confirm = new Confirm();
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const totalOrder = urlParams.get('total');

confirm.addConfirmationOrder(totalOrder);

