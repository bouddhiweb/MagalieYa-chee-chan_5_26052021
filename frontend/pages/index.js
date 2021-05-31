import Products from "../classes/Products";

fetch('http://localhost:3000/api/teddies')
    .then(response=>response.json())
    .then(photos=>{
        photos.forEach(productsData => {
            const products = new Products(productsData);
            products.display();
        })
    })
