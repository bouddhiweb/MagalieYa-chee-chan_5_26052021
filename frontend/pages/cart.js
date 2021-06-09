import Cart from "../classes/Cart.js";

fetch('http://localhost:3000/api/teddies/')
    .then(response=>response.json())
    .then(productData=>{
        const cart = new Cart(productData);
        cart.displayCart();
    });
