import Product from "../classes/Product.js";

//récupération de l'ID de l'ourson de la page

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const teddyId = urlParams.get('id');
console.log(teddyId);

fetch('http://localhost:3000/api/teddies/' + teddyId)
    .then(response=>response.json())
    .then(productData=>{
        const product = new Product(productData);
        product.display('full');
    });

