import Product from "../classes/Product.js";

fetch('http://localhost:3000/api/teddies')
    .then(response=>response.json())
    .then(products=>{
        products.forEach(productData => {
            const product = new Product(productData);
            product.display('thumbnail');
        })
    })